// The Excuse That Almost Works — make.fun entry.
// Writes the one-line GTA 6 excuse to /output/entry.txt.
// Shipped line won the 3x10 duel table (round 1, 10W, margin 19): the
// "awake since 3am" tell is the laugh — the reason is felt, never stated.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I need a personal day, I've been awake since 3am and I can't think straight.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. Competition rule: one line, at most 20 words.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
const words = LINE.trim().split(/\s+/);
if (words.length > 20) {
  throw new Error(`entry must be at most 20 words, got ${words.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, ${words.length} words, 1 line`);
