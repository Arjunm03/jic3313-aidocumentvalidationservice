const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
require('dotenv').config();
const KEY = process.env["AZURE_DOC_INTEL_KEY"];
const ENDPOINT = process.env["AZURE_DOC_INTEL_ENDPOINT"];

  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
      const key = KEY;
      const endpoint = ENDPOINT;
// sample document
    invoiceUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"

async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-invoice", invoiceUrl);

    const {
        pages,
        tables
    } = await poller.pollUntilDone();

    if (pages.length <= 0) {
        console.log("No pages were extracted from the document.");
    } else {
        console.log("Pages:");
        for (const page of pages) {
            console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
            console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
            console.log(`  ${page.lines.length} lines, ${page.words.length} words`);
        }
    }

    if (tables.length <= 0) {
        console.log("No tables were extracted from the document.");
    } else {
        console.log("Tables:");
        for (const table of tables) {
            console.log(
                `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
            );
        }
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});