import { describe, it, expect } from 'vitest';
import { getDiagramNodes } from '../getDiagramNodes';

describe('getDiagramNodes', () => {
  it('should return an array of 10000 nodes', () => {
    const nodes = getDiagramNodes();
    expect(nodes).toHaveLength(10000);
  });

  it('should contain the correct node objects', () => {
    const nodes = getDiagramNodes();

    // Check the first node
    expect(nodes[0]).toEqual({
      key: 1,
      text: 'N-1',
      color: '#ff9999',
      loc: '0 100',
    });

    // Check the second node
    expect(nodes[1]).toEqual({
      key: -2,
      text: 'N-5001',
      color: '#ff0000',
      loc: '200 100',
    });

    // Check the last node
    expect(nodes[9998]).toEqual({
      key: 5000,
      text: 'N-5000',
      color: '#ff9999',
      loc: '0 500000',
    });

    // Check the second last node
    expect(nodes[9999]).toEqual({
      key: -5001,
      text: 'N-10000',
      color: '#ff0000',
      loc: '200 500000',
    });
  });
});
