/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in example
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];
  // Get all direct child .teaser elements
  const teasers = element.querySelectorAll(':scope > .teaser');
  teasers.forEach((teaser) => {
    // Get the image element (do not clone, use reference)
    const img = teaser.querySelector('.cmp-image img');
    // Compose text cell: title (as strong) and description (below)
    const textCell = [];
    const title = teaser.querySelector('.teaser__name');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCell.push(strong);
    }
    const desc = teaser.querySelector('.teaser__expertise');
    if (desc) {
      // Add a <br> if there's a title
      if (title) {
        textCell.push(document.createElement('br'));
      }
      // Use reference to the desc element
      textCell.push(desc);
    }
    // Add row: first cell img, second cell text content
    rows.push([
      img || '',
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
