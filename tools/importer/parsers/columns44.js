/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const container = element.querySelector('.cmp-splitlayout-50-50.cmp-splitlayout__container');
  if (!container) return;
  const items = Array.from(container.querySelectorAll(':scope > .cmp-splitlayout__container-item'));
  if (items.length !== 2) return;

  function extractCell(col) {
    const bits = [];
    // Get text
    const text = col.querySelector('.cmp-text');
    if (text) bits.push(text);
    // Get multilinklist with at least one link
    const linkList = Array.from(col.querySelectorAll('.cmp-multilinklist'))
      .find(ll => ll.querySelector('a'));
    if (linkList) bits.push(linkList);
    // Get image
    const img = col.querySelector('.cmp-image');
    if (img) bits.push(img);
    return bits;
  }

  const left = extractCell(items[0]);
  const right = extractCell(items[1]);

  // Build cells: header is single column, content is two columns
  const cells = [];
  // Header row: exactly one column
  cells.push(['Columns (columns44)']);
  // Content row: as many columns as detected
  cells.push([left, right]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
