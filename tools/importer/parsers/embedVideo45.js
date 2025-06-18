/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML does NOT contain an embed, image, or external video link.
  // As per instructions, we should only create the Embed (embedVideo45) block if a valid embed (video/image/link) is present.
  // Since the element only contains metadata and decorative elements, do not create a block -- simply remove the element.
  element.remove();
}