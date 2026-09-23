#!/usr/bin/env python3
"""Minimal QR code generator (version 5, error correction level Q, byte mode).

Written by hand so the project does not need an extra dependency just to put a
code on a printed page. Version 5 holds 60 bytes, which is plenty for a URL, and
level Q tolerates roughly 25 percent damage -- useful on paper that gets handled.

Usage: python3 scripts/make-qr.py "<url>" <output.svg>
"""

from __future__ import annotations

import sys

VERSION = 5
SIZE = 17 + 4 * VERSION  # 37 modules
ALIGNMENT_CENTERS = (6, 30)
# Level Q, version 5: four blocks, 18 error correction codewords each.
EC_PER_BLOCK = 18
BLOCKS = ((2, 15), (2, 16))  # (block count, data codewords per block)
DATA_CODEWORDS = sum(count * size for count, size in BLOCKS)  # 62
REMAINDER_BITS = 7
EC_LEVEL_BITS = 0b11  # Q

# --- Galois field GF(256) with the QR primitive polynomial 0x11d ----------

EXP = [0] * 512
LOG = [0] * 256
_x = 1
for _i in range(255):
    EXP[_i] = _x
    LOG[_x] = _i
    _x <<= 1
    if _x & 0x100:
        _x ^= 0x11D
for _i in range(255, 512):
    EXP[_i] = EXP[_i - 255]


def gf_mul(a: int, b: int) -> int:
    if a == 0 or b == 0:
        return 0
    return EXP[LOG[a] + LOG[b]]


def generator_poly(degree: int) -> list[int]:
    poly = [1]
    for i in range(degree):
        nxt = [0] * (len(poly) + 1)
        for j, coeff in enumerate(poly):
            nxt[j] ^= gf_mul(coeff, 1)
            nxt[j + 1] ^= gf_mul(coeff, EXP[i])
        poly = nxt
    return poly


def ec_codewords(data: list[int], count: int) -> list[int]:
    gen = generator_poly(count)
    remainder = list(data) + [0] * count
    for i in range(len(data)):
        factor = remainder[i]
        if factor == 0:
            continue
        for j, coeff in enumerate(gen):
            remainder[i + j] ^= gf_mul(coeff, factor)
    return remainder[len(data):]


# --- Encoding -------------------------------------------------------------


def encode(payload: bytes) -> list[int]:
    capacity = (DATA_CODEWORDS * 8 - 12) // 8
    if len(payload) > capacity:
        raise ValueError(f"{len(payload)} bytes do not fit, limit is {capacity}")

    bits: list[int] = []

    def push(value: int, length: int) -> None:
        for shift in range(length - 1, -1, -1):
            bits.append((value >> shift) & 1)

    push(0b0100, 4)  # byte mode
    push(len(payload), 8)  # character count, 8 bits for versions 1-9
    for byte in payload:
        push(byte, 8)

    push(0, min(4, DATA_CODEWORDS * 8 - len(bits)))  # terminator
    while len(bits) % 8:
        bits.append(0)

    codewords = [int("".join(str(b) for b in bits[i:i + 8]), 2) for i in range(0, len(bits), 8)]
    for pad in range(DATA_CODEWORDS - len(codewords)):
        codewords.append(0xEC if pad % 2 == 0 else 0x11)
    return codewords


def interleave(codewords: list[int]) -> list[int]:
    blocks: list[list[int]] = []
    pos = 0
    for count, size in BLOCKS:
        for _ in range(count):
            blocks.append(codewords[pos:pos + size])
            pos += size
    ec_blocks = [ec_codewords(block, EC_PER_BLOCK) for block in blocks]

    result: list[int] = []
    for i in range(max(len(b) for b in blocks)):
        for block in blocks:
            if i < len(block):
                result.append(block[i])
    for i in range(EC_PER_BLOCK):
        for block in ec_blocks:
            result.append(block[i])
    return result


# --- Matrix ---------------------------------------------------------------


def new_matrix() -> tuple[list[list[int | None]], list[list[bool]]]:
    modules: list[list[int | None]] = [[None] * SIZE for _ in range(SIZE)]
    reserved = [[False] * SIZE for _ in range(SIZE)]

    def place(row: int, col: int, value: int) -> None:
        modules[row][col] = value
        reserved[row][col] = True

    # Finder patterns plus their separators.
    for base_r, base_c in ((0, 0), (0, SIZE - 7), (SIZE - 7, 0)):
        for r in range(-1, 8):
            for c in range(-1, 8):
                row, col = base_r + r, base_c + c
                if not (0 <= row < SIZE and 0 <= col < SIZE):
                    continue
                inside = 0 <= r < 7 and 0 <= c < 7
                dark = inside and (
                    r in (0, 6) or c in (0, 6) or (2 <= r <= 4 and 2 <= c <= 4)
                )
                place(row, col, 1 if dark else 0)

    # Timing patterns.
    for i in range(8, SIZE - 8):
        bit = 1 if i % 2 == 0 else 0
        place(6, i, bit)
        place(i, 6, bit)

    # Alignment patterns, skipping the ones that would sit on a finder.
    for cr in ALIGNMENT_CENTERS:
        for cc in ALIGNMENT_CENTERS:
            first, last = ALIGNMENT_CENTERS[0], ALIGNMENT_CENTERS[-1]
            if (cr, cc) in ((first, first), (first, last), (last, first)):
                continue
            if reserved[cr][cc]:
                continue
            for r in range(-2, 3):
                for c in range(-2, 3):
                    dark = max(abs(r), abs(c)) != 1
                    place(cr + r, cc + c, 1 if dark else 0)

    # Dark module, always set for every version.
    place(4 * VERSION + 9, 8, 1)

    # Reserve the two format information areas.
    for i in range(9):
        if modules[8][i] is None:
            reserved[8][i] = True
        if modules[i][8] is None:
            reserved[i][8] = True
    for i in range(8):
        reserved[8][SIZE - 1 - i] = True
        reserved[SIZE - 1 - i][8] = True

    return modules, reserved


def place_data(modules, reserved, bits: list[int]) -> None:
    index = 0
    upward = True
    col = SIZE - 1
    while col > 0:
        if col == 6:  # the vertical timing pattern is not a data column
            col -= 1
        rows = range(SIZE - 1, -1, -1) if upward else range(SIZE)
        for row in rows:
            for c in (col, col - 1):
                if reserved[row][c]:
                    continue
                modules[row][c] = bits[index] if index < len(bits) else 0
                index += 1
        upward = not upward
        col -= 2


MASKS = (
    lambda r, c: (r + c) % 2 == 0,
    lambda r, c: r % 2 == 0,
    lambda r, c: c % 3 == 0,
    lambda r, c: (r + c) % 3 == 0,
    lambda r, c: (r // 2 + c // 3) % 2 == 0,
    lambda r, c: (r * c) % 2 + (r * c) % 3 == 0,
    lambda r, c: ((r * c) % 2 + (r * c) % 3) % 2 == 0,
    lambda r, c: ((r + c) % 2 + (r * c) % 3) % 2 == 0,
)


def apply_mask(modules, reserved, mask: int) -> list[list[int]]:
    rule = MASKS[mask]
    out = [[modules[r][c] or 0 for c in range(SIZE)] for r in range(SIZE)]
    for r in range(SIZE):
        for c in range(SIZE):
            if not reserved[r][c] and rule(r, c):
                out[r][c] ^= 1
    return out


def format_bits(mask: int) -> list[int]:
    value = (EC_LEVEL_BITS << 3) | mask
    rest = value << 10
    for i in range(4, -1, -1):
        if rest & (1 << (i + 10)):
            rest ^= 0b10100110111 << i
    combined = ((value << 10) | rest) ^ 0b101010000010010
    # Index i holds bit i of the format string, counting from the low end.
    return [(combined >> i) & 1 for i in range(15)]


def place_format(grid, mask: int) -> None:
    """Write both copies of the 15 format bits, counting from the low bit.

    Column 6 and row 6 carry the timing patterns, so the runs step over them.
    """
    bits = format_bits(mask)
    for i, bit in enumerate(bits):
        # Copy one: down the left of the top-left finder, then on to the bottom.
        if i < 6:
            grid[i][8] = bit
        elif i < 8:
            grid[i + 1][8] = bit
        else:
            grid[SIZE - 15 + i][8] = bit
        # Copy two: in from the top-right corner, then back towards column 0.
        if i < 8:
            grid[8][SIZE - 1 - i] = bit
        elif i == 8:
            grid[8][7] = bit
        else:
            grid[8][14 - i] = bit


def penalty(grid) -> int:
    score = 0
    # Rule 1: runs of five or more identical modules.
    for line in list(grid) + [list(col) for col in zip(*grid)]:
        run, prev = 1, line[0]
        for value in line[1:]:
            if value == prev:
                run += 1
            else:
                if run >= 5:
                    score += 3 + (run - 5)
                run, prev = 1, value
        if run >= 5:
            score += 3 + (run - 5)
    # Rule 2: 2x2 blocks of one colour.
    for r in range(SIZE - 1):
        for c in range(SIZE - 1):
            if grid[r][c] == grid[r][c + 1] == grid[r + 1][c] == grid[r + 1][c + 1]:
                score += 3
    # Rule 3: finder-like patterns.
    pattern_a = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]
    pattern_b = list(reversed(pattern_a))
    for line in list(grid) + [list(col) for col in zip(*grid)]:
        for i in range(SIZE - 10):
            window = line[i:i + 11]
            if window == pattern_a or window == pattern_b:
                score += 40
    # Rule 4: overall balance of dark modules.
    dark = sum(sum(row) for row in grid)
    ratio = dark * 100 // (SIZE * SIZE)
    score += 10 * min(abs(ratio - 50) // 5, abs(ratio - 50 + 4) // 5)
    return score


def build(payload: bytes) -> list[list[int]]:
    bits: list[int] = []
    for codeword in interleave(encode(payload)):
        for shift in range(7, -1, -1):
            bits.append((codeword >> shift) & 1)
    bits.extend([0] * REMAINDER_BITS)

    modules, reserved = new_matrix()
    place_data(modules, reserved, bits)

    best, best_score = None, None
    for mask in range(8):
        grid = apply_mask(modules, reserved, mask)
        place_format(grid, mask)
        score = penalty(grid)
        if best_score is None or score < best_score:
            best, best_score = grid, score
    return best


def to_svg(grid, quiet_zone: int = 4) -> str:
    total = SIZE + 2 * quiet_zone
    paths = []
    for r, row in enumerate(grid):
        c = 0
        while c < SIZE:
            if row[c]:
                start = c
                while c < SIZE and row[c]:
                    c += 1
                paths.append(f"M{start + quiet_zone} {r + quiet_zone}h{c - start}v1h-{c - start}z")
            else:
                c += 1
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total} {total}" '
        f'shape-rendering="crispEdges" role="img" aria-label="QR-Code zur Online-Galerie">'
        f'<rect width="{total}" height="{total}" fill="#ffffff"/>'
        f'<path d="{"".join(paths)}" fill="#190c06"/>'
        f"</svg>\n"
    )


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: make-qr.py <url> <output.svg>")
    url, out_path = sys.argv[1], sys.argv[2]
    with open(out_path, "w", encoding="utf-8") as handle:
        handle.write(to_svg(build(url.encode("utf-8"))))
    print(f"{out_path} written for {url}")
