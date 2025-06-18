/* global WebImporter */
export default function parse(element, { document }) {
  // Find the split layout container
  const splitContainer = element.querySelector('.cmp-splitlayout__container');
  if (!splitContainer) return;

  // Find the column items (these are the columns)
  const items = Array.from(splitContainer.querySelectorAll(':scope > .cmp-splitlayout__container-item'));
  if (!items.length) return;

  // Build content columns
  const columns = items.map(item => {
    // Each item may have a single child (image/text) or more
    const children = Array.from(item.children);
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      const fragment = document.createDocumentFragment();
      children.forEach(child => fragment.appendChild(child));
      return fragment;
    } else {
      return '';
    }
  });
  
  // The block table header should be a SINGLE column as in the example: [['Columns (columns28)'], [...columns]]
  // But the content row should have as many columns as detected
  const tableRows = [];
  // Header: single cell spanning all columns
  const headerRow = ['Columns (columns28)'];
  tableRows.push(headerRow);
  // Content: the columns row
  tableRows.push(columns);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
