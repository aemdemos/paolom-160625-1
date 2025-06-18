/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example: 'Hero'
  const headerRow = ['Hero'];

  // Second row is just the background image, which is empty in the HTML example
  const imageRow = [''];

  // Gather the content for the third row. This should include:
  // - Label (e.g., PRODUCT TECHNOLOGIES)
  // - Title (e.g., Our smoke-free products)
  // - Description/paragraph
  // - CTA/button (as a link)

  // Find the label (if present)
  const label = element.querySelector('.headertitleblock__labels');
  // Find the heading/title (h2)
  const title = element.querySelector('.headertitleblock__title');
  // Find the description (paragraph)
  const description = element.querySelector('.medium-text');
  // Find the call-to-action button (if present)
  const cta = element.querySelector('.header-title__button');

  // Construct the cell content in the correct order. Only include if present.
  const contentParts = [label, title, description, cta].filter(Boolean);

  // Construct the table rows as per the example (1 col, 3 rows)
  const tableRows = [
    headerRow,
    imageRow,
    [contentParts]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
