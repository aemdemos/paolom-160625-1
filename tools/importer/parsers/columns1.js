/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (the two columns)
  const grid = element.querySelector('.cmp-container > .aem-Grid');
  if (!grid) return;
  // Get the two direct column wrappers
  const colWrappers = Array.from(grid.children).filter(child => child.classList.contains('responsivegrid'));
  if (colWrappers.length < 2) return;

  // LEFT COLUMN: tags block only (list of tags)
  let leftColContent = [];
  const leftInnerGrid = colWrappers[0].querySelector('.aem-Grid');
  if (leftInnerGrid) {
    // Typically only one tags block in left column
    const tagsBlock = leftInnerGrid.querySelector('.tagswidgetblock');
    if (tagsBlock) {
      leftColContent.push(tagsBlock);
    } else {
      // fallback: push innerGrid content if no tags found
      leftColContent.push(leftInnerGrid);
    }
  }

  // RIGHT COLUMN: entire article content
  let rightColContent = [];
  const rightInnerGrid = colWrappers[1].querySelector('.aem-Grid');
  if (rightInnerGrid) {
    const article = rightInnerGrid.querySelector('.articlecontent');
    if (article) {
      rightColContent.push(article);
    } else {
      // fallback: push innerGrid content if no article found
      rightColContent.push(rightInnerGrid);
    }
  }

  // Build the table: header and two columns (single row)
  const headerRow = ['Columns (columns1)'];
  const contentRow = [leftColContent, rightColContent];

  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
