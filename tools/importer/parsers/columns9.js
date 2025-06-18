/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container of the columns
  const container = element.querySelector('.cmp-splitlayout__container');
  if (!container) return;

  // Find immediate column items
  const items = Array.from(container.querySelectorAll(':scope > .cmp-splitlayout__container-item'));
  if (items.length !== 2) return;

  // First column: image (use the centering wrapper for fidelity)
  const imageColumn = items[0].querySelector('.align-element-center') || items[0];
  // Second column: text (grab the main .headertitleblock, preserve all structure)
  const textColumn = items[1].querySelector('.headertitleblock') || items[1];

  // Build the table; header as in spec, then two columns
  const cells = [
    ['Columns (columns9)'],
    [imageColumn, textColumn]
  ];

  // Build the block and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
