/* global WebImporter */
export default function parse(element, { document }) {
  // Find the split layout columns
  const colsContainer = element.querySelector('.cmp-splitlayout__container');
  if (!colsContainer) return;
  const colDivs = colsContainer.querySelectorAll(':scope > .cmp-splitlayout__container-item');

  // Defensive: If not 2 columns, fallback to dropping in all children
  if (colDivs.length !== 2) {
    const headerRow = ['Columns (columns40)'];
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // --- First Column: Only the image (no extra wrapper divs) ---
  const col1 = colDivs[0];
  let col1Content = [];
  // Try to get the <img> inside the column
  const img = col1.querySelector('img');
  if (img) {
    col1Content.push(img);
  }
  // If for some reason no image, fallback to all children of col1
  if (col1Content.length === 0) {
    Array.from(col1.childNodes).forEach(n => col1Content.push(n));
  }

  // --- Second Column: Label, h2, p, multilink <a> ---
  const col2 = colDivs[1];
  const col2ContentArr = [];

  // 1. Label (OPEN SCIENCE)
  const labelDiv = col2.querySelector('.headertitleblock__labels');
  if (labelDiv) col2ContentArr.push(labelDiv);
  // 2. h2
  const h2 = col2.querySelector('h2');
  if (h2) col2ContentArr.push(h2);
  // 3. All <p>
  const ps = col2.querySelectorAll('p');
  ps.forEach(p => col2ContentArr.push(p));
  // 4. multilink <a>
  const multilink = col2.querySelector('.cmp-multilinklist__list-item-link');
  if (multilink) col2ContentArr.push(multilink);

  // Build the header and data rows
  const headerRow = ['Columns (columns40)'];
  const dataRow = [col1Content, col2ContentArr];

  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(block);
}
