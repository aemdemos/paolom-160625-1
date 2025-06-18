/* global WebImporter */
export default function parse(element, { document }) {
  // To avoid HierarchyRequestError, we must not insert an element into itself
  // We'll wrap the content of the target element in a container, then use that as the table cell
  const headerRow = ['Columns (columns19)'];
  // Create a container and move all child nodes into it
  const container = document.createElement('div');
  while (element.firstChild) {
    container.appendChild(element.firstChild);
  }
  const contentRow = [container];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}