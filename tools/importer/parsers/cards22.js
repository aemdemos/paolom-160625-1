/* global WebImporter */
export default function parse(element, { document }) {
  // Start with the correct header row
  const rows = [['Cards (cards22)']];

  // Find the cards list
  const ul = element.querySelector('ul.cmp-infohighlight__list');
  if (ul) {
    // For each list item (card)
    ul.querySelectorAll(':scope > li.cmp-infohighlight__list-item').forEach((li) => {
      // First cell: image element
      let img = null;
      const imgDiv = li.querySelector('.cmp-infohighlight__image');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      }
      // Second cell: heading and description as array of elements
      const textContent = [];
      const cardDiv = li.querySelector('.cmp-infohighlight__card');
      if (cardDiv) {
        // Heading (preserve original element)
        const heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) textContent.push(heading);
        // Description
        const desc = cardDiv.querySelector('p');
        if (desc) textContent.push(desc);
      }
      // Add row to table (always two columns, even if one is empty)
      rows.push([img, textContent]);
    });
  }

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}