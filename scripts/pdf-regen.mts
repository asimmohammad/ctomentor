// One-off: re-render and re-upload the PDF for an existing submission so an
// already-sent email link serves the corrected layout. Usage: tsx pdf-regen.mts <id>
import { getAssessment } from "../src/lib/assessment/store";
import { generateAndStorePdf } from "../src/lib/assessment/pdf-delivery";
import { updateSubmissionPdf } from "../src/lib/assessment/repository";

const id = process.argv[2];
if (!id) throw new Error("pass a submission id");

const record = await getAssessment(id);
if (!record) throw new Error(`no submission ${id}`);

const url = await generateAndStorePdf(record);
if (!url) throw new Error("pdf regeneration failed");

await updateSubmissionPdf(id, url);
console.log("regenerated:", url.slice(0, 120), "...");
