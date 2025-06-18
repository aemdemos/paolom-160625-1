/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Columns (columns3)'];

  // Find the main split columns container
  const container = element.querySelector('.cmp-splitlayout__container');
  if (!container) return;
  const items = container.querySelectorAll(':scope > .cmp-splitlayout__container-item');
  if (items.length < 2) return;

  // --- FIRST COLUMN ---
  const firstCol = items[0];
  // We want to include the title + subtitle, description, and the download link (as seen visually)
  // Instead of picking individual text, include the full block for resilience
  const col1Content = [];

  // Title and description block
  const headerBlock = firstCol.querySelector('.headergenerictitleblock, .headertitleblock');
  if (headerBlock) col1Content.push(headerBlock);

  // Download link (single <a> inside multilinklist)
  const multiLinkList = firstCol.querySelector('.multilinklist, .cmp-multilinklist');
  if (multiLinkList) {
    col1Content.push(multiLinkList);
  }

  // --- SECOND COLUMN ---
  const secondCol = items[1];
  // The main image block; reference the image wrapper as a whole for robustness
  let imageBlock = secondCol.querySelector('.image');
  if (!imageBlock) imageBlock = secondCol;

  // Assemble columns table row
  const row = [
    col1Content.length === 1 ? col1Content[0] : col1Content,
    imageBlock
  ];

  // Compose cells for the table
  const cells = [headerRow, row];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
