/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the column container
  const splitContainer = element.querySelector('.cmp-splitlayout__container');
  if (!splitContainer) return;

  // 2. Get immediate column items (should be 2)
  const items = splitContainer.querySelectorAll(':scope > .cmp-splitlayout__container-item');
  if (items.length < 2) return;

  // 3. LEFT COLUMN: Gather header and link list (in order)
  const left = items[0];
  // Remove spacing separators (decorative)
  left.querySelectorAll('.pmi-spacing-separator').forEach(e => e.remove());
  // The main relevant content blocks
  const leftContentParts = [];
  const header = left.querySelector('.headergenerictitleblock, .headertitleblock');
  if (header) leftContentParts.push(header);
  // Multilinklist (if present)
  const multilink = left.querySelector('.multilinklist');
  if (multilink) leftContentParts.push(multilink);
  // Compose left cell content
  let leftContent;
  if (leftContentParts.length === 1) {
    leftContent = leftContentParts[0];
  } else if (leftContentParts.length > 1) {
    leftContent = document.createElement('div');
    leftContentParts.forEach(part => leftContent.appendChild(part));
  } else {
    // fallback: use all content (should not occur)
    leftContent = left;
  }

  // 4. RIGHT COLUMN: Embed/iframe -> link
  const right = items[1];
  let rightContent;
  // Try to find an iframe (embed chart)
  const iframe = right.querySelector('iframe');
  if (iframe) {
    // Convert iframe to a link (per requirements)
    const link = document.createElement('a');
    link.href = iframe.src;
    link.textContent = iframe.title || iframe.src;
    rightContent = link;
  } else {
    // fallback: use the entire content
    rightContent = right;
  }

  // 5. Compose the table
  const cells = [
    ['Columns (columns38)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(table);
}
