/* global WebImporter */
export default function parse(element, { document }) {
  // Table should have 1 column, 3 rows: header, image (empty), content
  // Header row: Exactly 'Hero' as in the example
  const headerRow = ['Hero'];
  // Image row: empty string, since no background image in this example
  const imageRow = [''];
  // Content row: should include h1 and paragraph, using existing elements
  let contentEls = [];
  const innerBlock = element.querySelector('.headertitleblock');
  if (innerBlock) {
    // Get the h1 (main heading)
    const h1 = innerBlock.querySelector('h1');
    if (h1) contentEls.push(h1);
    // Get all paragraphs inside medium-text, if available
    const mediumText = innerBlock.querySelector('.medium-text');
    if (mediumText) {
      Array.from(mediumText.children).forEach((child) => contentEls.push(child));
    }
  }
  const contentRow = [contentEls];
  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
