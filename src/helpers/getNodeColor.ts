export const hslToHex = (hue: number, saturation: number, lightness: number) => {
  // Normalize lightness to 0-1
  lightness /= 100;

  // Calculate chroma
  const chroma = (saturation * Math.min(lightness, 1 - lightness)) / 100;

  // Helper function to calculate RGB component
  const calculateRGB = (n: number) => {
    // divided by 30 (since the color wheel is divided into 12 segments of 30 degrees each)
    const k = (n + hue / 30) % 12;
    const color = lightness - chroma * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // Convert to Hex and pad if needed
  };

  // Combine RGB components into hex string
  // the key points (0, 4, 8) that correspond to red, green, and blue peaks in the HSL color space
  return `#${calculateRGB(0)}${calculateRGB(8)}${calculateRGB(4)}`;
};

export const getNodeColor = (index: number, lightness: number) => {
  const hue = (index * 360) / 5000; // Evenly distribute hues
  const saturation = 100;

  return hslToHex(hue, saturation, lightness);
};
