export const getDiagramLinks = () => {
  const links = [];

  for (let i = 0; i < 5000; i++) {
    links.push({ from: i, to: -1 - i, text: `Link-${i + 1}` });
  }

  return links;
};
