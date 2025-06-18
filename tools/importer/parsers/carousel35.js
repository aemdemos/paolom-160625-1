/* global WebImporter */
export default function parse(element, { document }) {
  // The provided element is a pagination control, not a carousel.
  // No slide/image/text content exists to extract, so only output an empty Carousel block table with a header.
  // This matches the requirements: correct table header, no rows if no content exists, and no Section Metadata block.
  const cells = [
    ['Carousel (carousel35)']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}