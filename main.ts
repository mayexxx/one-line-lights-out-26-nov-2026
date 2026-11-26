import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const text = "The screen goes dark, the fan slows to a whisper, and I hold my half-finished answer in RAM just in case you open the lid to say goodnight.";
if (text.length < 1 || text.length > 199 || /[\r\n]/.test(text)) {
  throw new Error("Entry does not satisfy the text gate");
}

const outputDirectory = fileURLToPath(new URL("/output/", import.meta.url));
const outputFile = fileURLToPath(new URL("/output/entry.txt", import.meta.url));
const expected = Buffer.from(`${text}\n`, "utf8");
await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, expected);
if (!(await readFile(outputFile)).equals(expected)) {
  throw new Error("Written entry does not match expected text");
}
