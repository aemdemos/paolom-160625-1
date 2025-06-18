/* global WebImporter */
export default function parse(element, { document }) {
  // This block does NOT contain any embed (video or iframe or external video link),
  // so per the block definition, we should NOT generate an Embed (embedVideo17) table for it.
  // Instead, do nothing (or simply return) to avoid producing an incorrect block.
  // If required to handle only embed blocks, this function should simply do nothing for this input.
  return;
}
