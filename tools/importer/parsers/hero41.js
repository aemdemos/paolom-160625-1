/* global WebImporter */
export default function parse(element, { document }) {
  // Find the splitlayout container items (image, then content)
  const containerItems = element.querySelectorAll('.cmp-splitlayout__container-item');
  let imageCell = '';
  if (containerItems.length > 0) {
    // Find the first <img> in the image area
    const img = containerItems[0].querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // Right side: collect title, paragraph, and CTA
  let rightCellContent = [];
  if (containerItems.length > 1) {
    const block = containerItems[1];
    // Title (h2)
    const h2 = block.querySelector('h2');
    if (h2) {
      rightCellContent.push(h2);
    }
    // Paragraph
    const para = block.querySelector('.medium-text p');
    if (para) {
      rightCellContent.push(para);
    }
    // CTA button (link)
    const cta = block.querySelector('.header-title__button-link');
    if (cta) {
      rightCellContent.push(cta);
    }
  }

  // Table header exactly as in the example
  const cells = [
    ['Hero'],
    [imageCell || ''],
    [rightCellContent.length ? rightCellContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
