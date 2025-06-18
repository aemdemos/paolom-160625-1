/* global WebImporter */
export default function parse(element, { document }) {
  // Find the split layout container (holds columns)
  const split = element.querySelector('.cmp-splitlayout__container');
  if (!split) return;
  const items = split.querySelectorAll(':scope > .cmp-splitlayout__container-item');
  if (items.length !== 2) return;

  // Get the left column (text+button)
  const leftCol = items[0];
  // Get the right column (image)
  const rightCol = items[1];

  // The left column: full header+text structure
  // Use the first child div as the content block.
  // This covers all the structured content (label, h2, text, link)
  // If that fails, fallback to the whole leftCol.
  let contentBlock = leftCol.querySelector('.headergenerictitleblock, .headertitleblock');
  if (!contentBlock) contentBlock = leftCol;

  // The right column: just the actual image
  // Use the parent .align-element-center to ensure image is well-contained
  let imgBlock = rightCol.querySelector('.align-element-center') || rightCol.querySelector('img');
  // fallback to rightCol if neither found
  if (!imgBlock) imgBlock = rightCol;

  // Compose rows
  const headerRow = ['Columns (columns43)'];
  const columnsRow = [contentBlock, imgBlock];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
