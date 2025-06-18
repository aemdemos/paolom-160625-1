/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image element for right column
  const imageWrapper = element.querySelector('[itemscope][itemtype="http://schema.org/ImageObject"]');
  let imgEl = null;
  if (imageWrapper) {
    imgEl = imageWrapper.querySelector('img');
  }

  // Find the left column content
  const contentWrapper = element.querySelector('.cmp-banner-content');
  let leftCell = '';
  if (contentWrapper) {
    // Get all relevant children (e.g. title, subtitle, button)
    const children = Array.from(contentWrapper.children).filter(el => el.textContent.trim() !== '' || el.children.length > 0);
    leftCell = children.length === 1 ? children[0] : children;
  }

  // Guarantee two columns in the content row
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCell, imgEl];
  const cells = [headerRow, contentRow];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
