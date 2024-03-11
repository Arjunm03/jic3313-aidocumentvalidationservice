const { AzureKeyCredential, DocumentIntelligence } = require("@azure-rest/ai-document-intelligence@1.0.0-beta.1");
require('dotenv').config();
// create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
async function main() {
    const client = DocumentIntelligence(process.env["AZURE_DOC_INTEL_ENDPOINT"], {
  key: process.env["AZURE_DOC_INTEL_KEY"],
})};