import { describe, it, expect } from 'vitest';
import { hslToHex, getNodeColor } from '../getNodeColor';

describe('hslToHex', () => {
  it('should convert HSL to Hex correctly for primary colors', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000'); // Red
    expect(hslToHex(120, 100, 50)).toBe('#00ff00'); // Green
    expect(hslToHex(240, 100, 50)).toBe('#0000ff'); // Blue
  });

  it('should handle edge cases for lightness', () => {
    expect(hslToHex(0, 100, 0)).toBe('#000000'); // Black
    expect(hslToHex(0, 0, 100)).toBe('#ffffff'); // White
  });

  it('should handle different hues correctly', () => {
    expect(hslToHex(60, 100, 50)).toBe('#ffff00'); // Yellow
    expect(hslToHex(180, 100, 50)).toBe('#00ffff'); // Cyan
    expect(hslToHex(300, 100, 50)).toBe('#ff00ff'); // Magenta
  });
});

describe('getNodeColor', () => {
  it('should generate colors evenly distributed across the hue spectrum', () => {
    expect(getNodeColor(0, 50)).toBe('#ff0000'); // Start
    expect(getNodeColor(2500, 50)).toBe('#00ffff'); // Middle
    expect(getNodeColor(5000, 50)).toBe('#ff0000'); // End
  });

  it('should apply the correct lightness to colors', () => {
    expect(getNodeColor(0, 25)).toBe('#800000'); // Darker red
    expect(getNodeColor(0, 75)).toBe('#ff8080'); // Lighter red
  });
});
