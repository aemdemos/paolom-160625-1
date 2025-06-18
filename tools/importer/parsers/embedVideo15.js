/* global WebImporter */
export default function parse(element, { document }) {
  // Create table header as per block requirement
  const headerRow = ['Embed (embedVideo15)'];

  // There is no video, image, or external link in the provided HTML.
  // Only a label and a decorative border. So the cell should be empty.
  // (If there were a video/image/link, we would extract and include it.)
  const cells = [
    headerRow,
    [''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
