/* global WebImporter */
export default function parse(element, { document }) {
  // As the analyzed HTML does not actually correspond to an Embed (embedVideo29) block (no video, image, or external embed),
  // but requirements specify to always output a table matching the markdown example structure, we'll create an empty Embed block.
  // Header must match exactly, table must be present!
  const headerRow = ['Embed (embedVideo29)'];
  // The content row should be a single empty cell, since there is no embed content
  const cells = [
    headerRow,
    [''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
