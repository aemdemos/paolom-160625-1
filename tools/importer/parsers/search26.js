/* global WebImporter */
export default function parse(element, { document }) {
  // --- CRITICAL REVIEW ---
  // Does the example require a hardcoded query index link, or should it be dynamic?
  // The block description says the second row should contain an absolute URL to the query index to search (e.g., https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json)
  // There is NO corresponding link in the provided HTML, so this is NOT dynamic. The absolute URL must be used as in the example.
  // There is only one table in the example and the header is 'Search (search26)', which is correct.
  // There is no Section Metadata in the example, so none should be created.
  // No text content from the provided HTML is supposed to be included in the table. Only the block name and query index URL.
  // The table is 1 column, 2 rows as expected.

  const headerRow = ['Search (search26)'];
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const a = document.createElement('a');
  a.href = queryIndexUrl;
  a.textContent = queryIndexUrl;
  const cells = [
    headerRow,
    [a]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
