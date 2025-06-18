/* global WebImporter */
export default function parse(element, { document }) {
  // Find main two columns: left (sidebar) and right (article)
  const mainGrids = element.querySelectorAll(':scope > .cmp-container > .aem-Grid > .responsivegrid');
  if (mainGrids.length < 2) return;

  // LEFT COLUMN: collect all top-level blocks within the sidebar grid (tags, multilinklist, etc.)
  const leftColGrid = mainGrids[0];
  const leftGrid = leftColGrid.querySelector(':scope > .aem-Grid');
  let leftColContent = [];
  if (leftGrid) {
    const leftBlocks = Array.from(leftGrid.children).filter(block => {
      return block.textContent.trim() !== '' || block.querySelector('img');
    });
    if (leftBlocks.length) leftColContent = leftBlocks;
  }

  // RIGHT COLUMN: the main article
  const rightColGrid = mainGrids[1];
  const rightGrid = rightColGrid.querySelector(':scope > .aem-Grid');
  let rightColContent = [];
  if (rightGrid) {
    const articleContentBlock = rightGrid.querySelector(':scope > .articlecontent');
    if (articleContentBlock) {
      rightColContent.push(articleContentBlock);
    }
  }

  // The columns block uses a single header cell, and the next row contains both columns as an array in a single cell
  const headerRow = ['Columns (columns33)'];
  const contentRow = [[...leftColContent, ...rightColContent]];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
