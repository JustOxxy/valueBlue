import { describe, it, expect } from 'vitest';
import { getDiagramLinks } from '../getDiagramLinks';

describe('getDiagramLinks', () => {
  it('should return an array of 5000 links', () => {
    const links = getDiagramLinks();
    expect(links).toHaveLength(5000);
  });

  it('should contain the correct link objects', () => {
    const links = getDiagramLinks();

    // Check the first link
    expect(links[0]).toEqual({ from: 0, to: -1, text: 'Link-1' });

    // Check the last link
    expect(links[4999]).toEqual({ from: 4999, to: -5000, text: 'Link-5000' });

    // Check a middle link
    const middleIndex = Math.floor(5000 / 2);
    expect(links[middleIndex]).toEqual({ from: middleIndex, to: -1 - middleIndex, text: `Link-${middleIndex + 1}` });
  });

  it('should have sequentially increasing "from" and "text" fields and decreasing "to" fields', () => {
    const links = getDiagramLinks();

    links.forEach((link, index) => {
      expect(link.from).toBe(index);
      expect(link.to).toBe(-1 - index);
      expect(link.text).toBe(`Link-${index + 1}`);
    });
  });
});
