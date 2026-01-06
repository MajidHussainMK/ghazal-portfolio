// Google Scholar Publication Extractor
// Run this script in the browser console on the Google Scholar profile page
// https://scholar.google.com/citations?user=t41u06IAAAAJ&hl=en

(function () {
  const publications = [];

  // Find all publication entries
  const pubElements = document.querySelectorAll("tr.gsc_a_tr");

  pubElements.forEach((pub, index) => {
    try {
      // Extract title
      const titleElement = pub.querySelector("a.gsc_a_at");
      const title = titleElement ? titleElement.textContent.trim() : "";

      // Extract authors
      const authorsElement = pub.querySelector(".gs_gray");
      const authors = authorsElement ? authorsElement.textContent.trim() : "";

      // Extract journal/venue
      const journalElements = pub.querySelectorAll(".gs_gray");
      const journal =
        journalElements.length > 1 ? journalElements[1].textContent.trim() : "";

      // Extract year
      const yearElement = pub.querySelector(".gsc_a_y");
      const year = yearElement ? yearElement.textContent.trim() : "";

      // Extract citation count
      const citationsElement = pub.querySelector(".gsc_a_c");
      const citations = citationsElement
        ? citationsElement.textContent.trim()
        : "0";

      if (title) {
        publications.push({
          title: title,
          authors: authors,
          journal: journal,
          year: year || "N/A",
          citations: citations,
        });
      }
    } catch (e) {
      console.error("Error extracting publication:", e);
    }
  });

  // Output as JSON
  console.log("=== EXTRACTED PUBLICATIONS ===");
  console.log(JSON.stringify(publications, null, 2));

  // Also output as HTML-ready format
  console.log("\n=== HTML FORMAT ===");
  publications.forEach((pub, index) => {
    console.log(`
          <div class="publication-item">
            <div class="publication-year">${pub.year}</div>
            <div class="publication-content">
              <h3>${pub.title}</h3>
              <p class="publication-journal">${pub.journal}</p>
              <p class="publication-authors">${pub.authors}</p>
            </div>
          </div>
        `);
  });

  // Copy to clipboard helper
  const htmlOutput = publications
    .map(
      (pub, index) => `
          <div class="publication-item">
            <div class="publication-year">${pub.year}</div>
            <div class="publication-content">
              <h3>${pub.title}</h3>
              <p class="publication-journal">${pub.journal}</p>
              <p class="publication-authors">${pub.authors}</p>
            </div>
          </div>
    `
    )
    .join("\n");

  // Create a temporary textarea to copy to clipboard
  const textarea = document.createElement("textarea");
  textarea.value = htmlOutput;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  console.log("\n✅ HTML code copied to clipboard!");
  console.log(`Found ${publications.length} publications`);

  return publications;
})();
