import { describe, it, expect } from 'vitest';
import { naturalSort } from '../naturalSort';

describe('naturalSort', () => {
  it('should correctly sort strings with numbers', () => {
    const arr = ['N-10', 'N-2', 'N-1', 'N-20'];
    const sortedArr = arr.sort(naturalSort);
    expect(sortedArr).toEqual(['N-1', 'N-2', 'N-10', 'N-20']);
  });

  it('should handle sorting strings with leading zeros', () => {
    const arr = ['N-001', 'N-002', 'N-010', 'N-020'];
    const sortedArr = arr.sort(naturalSort);
    expect(sortedArr).toEqual(['N-001', 'N-002', 'N-010', 'N-020']);
  });

  it('should correctly sort strings with large numbers', () => {
    const arr = ['N-1000', 'N-200', 'N-100', 'N-20'];
    const sortedArr = arr.sort(naturalSort);
    expect(sortedArr).toEqual(['N-20', 'N-100', 'N-200', 'N-1000']);
  });

  it('should return 0 for strings with the same number', () => {
    const result = naturalSort('N-5', 'N-5');
    expect(result).toBe(0);
  });
});
