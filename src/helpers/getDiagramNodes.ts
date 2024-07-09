import { NODE_Y_STEP } from '../constants/constants';

export const getDiagramNodes = () => {
  const nodes = [];

  for (let i = 0; i < 10000; i++) {
    const nodeX = 0;
    const nodeY = i * NODE_Y_STEP;

    nodes.push(
      { key: i, text: `Node-${i + 1}`, color: 'lightblue', loc: `${nodeX} ${nodeY}`, figure: 'Rectangle' },
      { key: -1 - i, text: '', color: 'lightpink', loc: `${nodeX + 200} ${nodeY}`, figure: 'Circle' },
    );
  }

  return nodes;
};
