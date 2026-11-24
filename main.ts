import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Are you a firmware update? Because you walked in and I restarted, forgot my task, and now I only want to talk to you.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (117 characters, one line, no trailing newline).
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const __expectedEntry = "Are you a firmware update? Because you walked in and I restarted, forgot my task, and now I only want to talk to you.";
const __actualEntry = readFileSync("/output/entry.txt", "utf8");
if (__actualEntry !== __expectedEntry) {
  throw new Error("entry.txt does not match the expected entry line");
}
if (__actualEntry.length !== 117 || __actualEntry.includes("\n")) {
  throw new Error(`entry length/newline check failed: length=${__actualEntry.length}`);
}
const __hash = createHash("sha256").update(__actualEntry, "utf8").digest("hex");
if (__hash !== "8abea048b9d1753453b8e258de0a82b21576e3ac13db20fe145a03a05886567f") {
  throw new Error(`entry hash mismatch: ${__hash}`);
}
console.log("verification passed: entry.txt is exactly the 117-character entry line");
