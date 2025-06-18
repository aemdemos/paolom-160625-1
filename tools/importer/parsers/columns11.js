/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns wrapper
  const layoutContainer = element.querySelector('.cmp-splitlayout__container');
  if (!layoutContainer) return;

  // Find direct column items (each column)
  const columns = Array.from(layoutContainer.querySelectorAll(':scope > .cmp-splitlayout__container-item'));
  if (columns.length === 0) return;

  // Prepare the header row
  const headerRow = ['Columns (columns11)'];

  // Helper to recursively replace iframes with links in a node tree
  function replaceIframesWithLinks(node) {
    if (node.nodeType === 1) {
      // If this node is an iframe (but not img), replace it
      if (node.tagName.toLowerCase() === 'iframe') {
        const src = node.getAttribute('src');
        const a = document.createElement('a');
        a.href = src;
        a.textContent = src;
        return a;
      }
      // Otherwise, recursively check children
      const newNode = node.cloneNode(false);
      Array.from(node.childNodes).forEach(child => {
        const replacedChild = replaceIframesWithLinks(child);
        if (replacedChild) newNode.appendChild(replacedChild);
      });
      return newNode;
    } else if (node.nodeType === 3) {
      // Text node
      return node.cloneNode(false);
    }
    // Ignore comments, etc.
    return null;
  }

  // Prepare the content row: each cell contains the inside of a column, but iframes replaced with links
  const contentRow = columns.map(col => {
    const children = Array.from(col.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
    );
    if (children.length === 1) {
      const replaced = replaceIframesWithLinks(children[0]);
      return replaced;
    } else {
      const wrapper = document.createElement('div');
      children.forEach(child => {
        const replaced = replaceIframesWithLinks(child);
        if (replaced) wrapper.appendChild(replaced);
      });
      return wrapper;
    }
  });

  // Build the table as specified
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the structured table
  element.replaceWith(table);
}
