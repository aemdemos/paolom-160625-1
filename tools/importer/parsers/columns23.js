/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main (left) teaser
  const mainTeaser = element.querySelector('.cmp-pmi-teaser-highlight__container > .teaser');
  // Get the teasers in the right column (side)
  const sideContainer = element.querySelector('.cmp-pmi-teaser-highlight__container-side');
  let rightTeasers = [];
  if (sideContainer) {
    rightTeasers = Array.from(sideContainer.querySelectorAll(':scope > .teaser'));
  }
  // Safety: At least two columns, even if missing data
  const col1 = mainTeaser || '';
  const col2 = rightTeasers.length ? rightTeasers : '';
  // Compose the block
  const headerRow = ['Columns (columns23)'];
  const contentRow = [col1, col2];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
