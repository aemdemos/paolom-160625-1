/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards32)'];
  // Get the swiper wrapper with all the cards
  const swiper = element.querySelector('.cmp-highlightedscientists__teaser-container');
  if (!swiper) return;

  // Find only the unique cards by data-swiper-slide-index (first occurrence for each index)
  const seenIndexes = new Set();
  const cards = [];
  const slides = Array.from(swiper.querySelectorAll(':scope > .swiper-slide'));
  for (const slide of slides) {
    const idx = slide.getAttribute('data-swiper-slide-index');
    if (seenIndexes.has(idx)) continue;
    seenIndexes.add(idx);

    const teaser = slide.querySelector('.cmp-highlightedscientists__teaser');
    if (!teaser) continue;
    const link = teaser.querySelector('.cmp-highlightedscientists__teaser-link');
    if (!link) continue;

    // Image cell: grab the <img> inside the <picture>
    let img = null;
    const imageContainer = link.querySelector('.cmp-highlightedscientists__image-container');
    if (imageContainer) {
      img = imageContainer.querySelector('img');
    }

    // Text cell: name and expertise
    const nameElement = link.querySelector('.cmp-highlightedscientists__teaser-name');
    const expertiseElement = link.querySelector('.cmp-highlightedscientists__teaser-expertise');
    const textCell = [];
    if (nameElement) {
      // Use a <strong> for the name for robust rendering, but reference text only
      const strong = document.createElement('strong');
      strong.textContent = nameElement.textContent.trim();
      textCell.push(strong);
    }
    if (expertiseElement) {
      // Add expertise in a <p>
      const p = document.createElement('p');
      p.textContent = expertiseElement.textContent.trim();
      textCell.push(p);
    }
    cards.push([img, textCell]);
  }

  if (!cards.length) return;
  const cells = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
