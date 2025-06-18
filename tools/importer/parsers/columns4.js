/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  let columnsContainer = element.querySelector('.cmp-splitlayout__container');
  if (!columnsContainer) columnsContainer = element;

  // Get the two column items (left and right)
  const colItems = Array.from(columnsContainer.querySelectorAll(':scope > .cmp-splitlayout__container-item'));

  // Defensive: ensure two columns
  const leftCol = colItems[0] || document.createElement('div');
  const rightCol = colItems[1] || document.createElement('div');

  // LEFT CELL: Collect .cmp-text and .cmp-multilinklist (skip spacing separators)
  const leftCellContent = [];
  const text = leftCol.querySelector('.cmp-text');
  if (text) leftCellContent.push(text);
  const multilink = leftCol.querySelector('.cmp-multilinklist');
  if (multilink) leftCellContent.push(multilink);

  // RIGHT CELL: Collect .cmp-image
  const rightCellContent = [];
  const image = rightCol.querySelector('.cmp-image');
  if (image) rightCellContent.push(image);

  // Build the columns block table
  const headerRow = ['Columns (columns4)'];
  const contentRow = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(table);
}