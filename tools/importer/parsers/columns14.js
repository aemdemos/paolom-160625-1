/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns14)'];

  // Get the split layout container (which holds the columns)
  const container = element.querySelector('.cmp-splitlayout__container');
  if (!container) return;
  const items = container.querySelectorAll(':scope > .cmp-splitlayout__container-item');
  if (items.length < 2) return;

  // Reference the left and right columns directly
  const leftCol = items[0];
  const rightCol = items[1];

  // Build the block table
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create and replace with the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
