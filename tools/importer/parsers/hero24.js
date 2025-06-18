/* global WebImporter */
export default function parse(element, { document }) {
  // Create table header exactly as in the example
  const headerRow = ['Hero'];

  // Find the iframe (video)
  const iframe = element.querySelector('iframe');
  let videoLink = '';
  if (iframe && iframe.src) {
    // Represent as a link to the video, per requirements
    const link = document.createElement('a');
    link.href = iframe.src;
    link.textContent = 'Video';
    videoLink = link;
  }

  // Extract the video title (from iframe's title attribute), as heading if present
  let title = '';
  if (iframe && iframe.title && iframe.title.trim()) {
    const h1 = document.createElement('h1');
    h1.textContent = iframe.title.trim();
    title = h1;
  }

  // As in the example: 3 rows: block name, image/video/link, heading
  const cells = [
    headerRow,
    [videoLink],
    [title]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
