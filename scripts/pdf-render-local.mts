// Renders an existing submission's PDF to a local file WITHOUT touching
// storage — for iterating on layout against real content.
// Usage: tsx scripts/pdf-render-local.mts <submission-id> <out-path>
import { writeFile } from "node:fs/promises";
import { getAssessment, toPublicResult } from "../src/lib/assessment/store";
import { renderAssessmentPdf } from "../src/lib/assessment/pdf";

const id = process.argv[2];
const out = process.argv[3] ?? "/home/user/workspace/pdf_local.pdf";
if (!id) throw new Error("pass a submission id");

const record = await getAssessment(id);
if (!record) throw new Error(`no submission ${id}`);

const buffer = await renderAssessmentPdf(toPublicResult(record));
await writeFile(out, buffer);
console.log("wrote", out, buffer.length, "bytes");
