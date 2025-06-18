/* global WebImporter */
export default function parse(element, { document }) {
  // Get the image inside the banner (if any)
  const img = element.querySelector('img');

  // Get the banner content block (may contain heading, subheading, etc.)
  const bannerContent = element.querySelector('.cmp-banner-content');

  // Build cells: [header], [image|empty], [content]
  const cells = [
    ['Hero'],
    [img ? img : ''],
    [bannerContent ? bannerContent : '']
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
