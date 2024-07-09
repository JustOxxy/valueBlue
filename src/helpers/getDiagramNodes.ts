import { NODE_Y_STEP } from '../constants/constants';
import { getNodeColor } from './getNodeColor';

export const getDiagramNodes = () => {
  const nodes = [];

  for (let i = 0; i < 5000; i++) {
    const nodeX = 0;
    const nodeY = i * NODE_Y_STEP;

    nodes.push(
      { key: i, text: `Node-${i + 1}`, color: getNodeColor(i, 80), loc: `${nodeX} ${nodeY}`, figure: 'Rectangle' },
      { key: -1 - i, text: '', color: getNodeColor(i, 50), loc: `${nodeX + 200} ${nodeY}`, figure: 'Circle' },
    );
  }

  return nodes;
};
