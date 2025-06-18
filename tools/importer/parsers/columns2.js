/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns inside the splitlayout
  const container = element.querySelector('.cmp-splitlayout__container');
  if (!container) return;
  const items = Array.from(container.querySelectorAll(':scope > .cmp-splitlayout__container-item'));
  // Only process if there are at least two columns
  if (items.length < 2) return;

  // Use the entire .cmp-splitlayout__container-item as the content for each column
  // This ensures all original content and structure is kept
  const col1 = items[0];
  const col2 = items[1];
  
  // Header row: exactly one column, no colspan
  // Content row: two columns (col1, col2)
  const cells = [
    ['Columns (columns2)'],
    [col1, col2]
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
