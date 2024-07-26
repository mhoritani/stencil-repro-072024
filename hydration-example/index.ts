import domino from "domino";
import fs from "fs/promises";
import { hydrateDocument } from "../stencil-lib/hydrate";

(async () => {
  try {
    const html = await fs.readFile("./index.input.html", { encoding: "utf-8" });
    const document = domino.createDocument(html);
    await hydrate(document);
  } catch (error) {
    console.error("Error reading input file:", error);
  }
})();

async function hydrate(document: Document) {
  try {
    // Interesting side-note: hydrateResults.html is always empty.
    // Instead it operates directly on the document passed in.
    // Is this intended?
    const hydrateResults = await hydrateDocument(document, {});
    console.log("Hydrate results HTML:", hydrateResults.html);

    const hydratedDocument = `<!doctype html> ${document.documentElement.outerHTML}`;
    await fs.writeFile("./index.output.html", hydratedDocument, {
      encoding: "utf-8",
    });

    console.log("Hydration completed and output written to index.output.html");
  } catch (error) {
    console.error("Error during hydration:", error);
  }
}
