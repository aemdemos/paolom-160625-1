/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block table: single cell
  const headerRow = ['Columns (columns18)'];

  // Find the main footer column group
  const group = element.querySelector('.cmp-footer__group');
  // Get all direct .cmp-footer__group-link children
  const groupLinks = group ? Array.from(group.querySelectorAll(':scope > .cmp-footer__group-link')) : [];
  // Only keep columns with actual content (not just whitespace)
  const groupColumns = groupLinks.filter(col => col && col.textContent.trim().length > 0);
  // If there are no non-empty columns, fallback to one empty cell
  const cellsRow = groupColumns.length ? groupColumns : [''];

  // Structure: first row is a single header cell, second row is N content cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);
  
  element.replaceWith(table);
}
