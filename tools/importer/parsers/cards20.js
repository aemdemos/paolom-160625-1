/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows array
  const rows = [['Cards (cards20)']];

  // Get all cards (teasers)
  const teasers = element.querySelectorAll(':scope > .teaser');
  teasers.forEach(teaser => {
    // First cell: image container
    const imgContainer = teaser.querySelector('.cmp-image');

    // Second cell: text content
    const textParts = [];
    // Category
    const category = teaser.querySelector('.teaser-category');
    if (category) textParts.push(category);
    // Title (as h4 with link)
    const title = teaser.querySelector('.teaser-title');
    const link = teaser.querySelector('a');
    if (title && link) {
      const h4 = document.createElement('h4');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = title.textContent.trim();
      h4.append(a);
      textParts.push(h4);
    } else if (title) {
      const h4 = document.createElement('h4');
      h4.textContent = title.textContent.trim();
      textParts.push(h4);
    }
    // Description
    const desc = teaser.querySelector('.teaser-description');
    if (desc) textParts.push(desc);
    // Date
    const date = teaser.querySelector('.teaser-date');
    if (date) textParts.push(date);

    rows.push([
      imgContainer,
      textParts
    ]);
  });

  // Create cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
