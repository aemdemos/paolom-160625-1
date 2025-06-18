/* global WebImporter */
export default function parse(element, { document }) {
  // Find the splitlayout container
  const container = element.querySelector('.cmp-splitlayout__container');
  if (!container) return;
  // Get the two columns (profile image and profile text)
  const items = container.querySelectorAll(':scope > .cmp-splitlayout__container-item');
  if (items.length < 2) return;

  // First column: image (with circular border)
  const imageCol = items[0];
  let imageCell = null;
  const roundImage = imageCol.querySelector('.round-image');
  if (roundImage) {
    imageCell = roundImage;
  } else {
    const img = imageCol.querySelector('img');
    if (img) imageCell = img;
    else imageCell = '';
  }

  // Second column: text content
  const textCol = items[1];
  const textElements = [];
  for (const node of textCol.childNodes) {
    if (node.nodeType === 1) {
      textElements.push(node);
    }
  }
  const textCell = textElements.length ? textElements : '';

  // Correct structure: header row is a single cell, content row is two cells
  const headerRow = ['Columns (columns21)'];
  const contentRow = [imageCell, textCell];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
