/* global WebImporter */
export default function parse(element, { document }) {
  // Only create the Embed (embedVideo8) block if there is a YouTube/Vimeo embed
  let embedLink = null;
  // Look for iframes first
  const iframe = element.querySelector('iframe');
  if (iframe && iframe.src && (iframe.src.includes('youtube.com') || iframe.src.includes('vimeo.com'))) {
    embedLink = iframe.src;
  } else {
    // If not, check for an <a> tag with a YouTube or Vimeo link
    const anchors = element.querySelectorAll('a[href]');
    for (const a of anchors) {
      if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//.test(a.href)) {
        embedLink = a.href;
        break;
      }
    }
  }

  // If no embed found, do NOT replace the element (leave the breadcrumb as-is)
  if (!embedLink) return;

  // Compose the table
  const headerRow = ['Embed (embedVideo8)'];
  let linkEl = Array.from(element.querySelectorAll('a[href]')).find(a => a.href === embedLink);
  if (!linkEl) {
    linkEl = document.createElement('a');
    linkEl.href = embedLink;
    linkEl.textContent = embedLink;
  }
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [linkEl],
  ], document);

  element.replaceWith(table);
}
