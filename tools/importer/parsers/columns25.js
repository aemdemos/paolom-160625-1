/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns25)'];

  // Find the top-level grid containing the main columns
  const grid = element.querySelector('.aem-Grid.cmp-article-template__main-container, .aem-Grid--12, .aem-Grid.aem-Grid--12');
  // Find the first two main responsivegrid columns
  let colDivs = [];
  if (grid) {
    colDivs = Array.from(grid.children).filter(div => div.classList.contains('responsivegrid'));
  } else {
    // fallback: direct children with responsivegrid
    colDivs = Array.from(element.querySelectorAll(':scope > .responsivegrid'));
  }
  // Defensive: Only use first two columns, which correspond to columns in the example
  const firstCol = colDivs[0] || null;
  const secondCol = colDivs[1] || null;

  // Helper to extract all content blocks from a responsivegrid column
  function extractColumnContent(col) {
    if (!col) return '';
    // Find the deepest .aem-Grid
    let deepestGrid = col.querySelector('.aem-Grid:last-of-type');
    if (!deepestGrid) deepestGrid = col;
    // Collect all contentful blocks inside this column (skip empty .aem-GridColumn elements)
    let blocks = [];
    for (const child of deepestGrid.children) {
      // Only add meaningful content blocks
      if (child.innerText.trim() || child.querySelector('img')) {
        blocks.push(child);
      }
    }
    if (!blocks.length) blocks = [col];
    return blocks;
  }

  const leftColBlocks = extractColumnContent(firstCol);
  const rightColBlocks = extractColumnContent(secondCol);

  // The first row after the header: two columns side-by-side
  const firstRow = [leftColBlocks, rightColBlocks];

  // Now, extract additional rows, where each row = two columns of (image, text) pairs
  // Look for .align-element-center .cmp-image and their associated .cmp-text siblings
  const additionalRows = [];

  // Find all image+text pairs that are in the same .aem-Grid (excluding deeply nested ones in the first two columns)
  // Let's get all .image blocks with .align-element-center .cmp-image
  const imageBlocks = Array.from(element.querySelectorAll('.align-element-center .cmp-image'));
  
  imageBlocks.forEach(imgBlock => {
    // The containing .image or .align-element-center div
    const imageWrapper = imgBlock.closest('.image') || imgBlock.closest('.align-element-center') || imgBlock;
    // Try to find a text sibling in the same grid column
    let textBlock = null;
    // Find the closest .text sibling that follows this image block
    let parentColumn = imageWrapper.parentElement;
    while (parentColumn && !parentColumn.classList.contains('aem-Grid')) {
      parentColumn = parentColumn.parentElement;
    }
    if (parentColumn) {
      const siblings = Array.from(parentColumn.children);
      const imgIdx = siblings.indexOf(imageWrapper);
      // Search for a .cmp-text after this image within the same parent
      for (let i = imgIdx + 1; i < siblings.length; i++) {
        if (siblings[i].querySelector('.cmp-text')) {
          textBlock = siblings[i].querySelector('.cmp-text');
          break;
        }
      }
    }
    // Defensive: if not found, look for .cmp-text near the image
    if (!textBlock) {
      textBlock = imageWrapper.querySelector('.cmp-text');
    }
    // Add row if not already in first row (avoid duplicates)
    if (imageWrapper && (textBlock || textBlock === null)) {
      additionalRows.push([imageWrapper, textBlock || '']);
    }
  });

  // Build the table cells
  const cells = [headerRow, firstRow, ...additionalRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
