import { ReactDiagram } from 'gojs-react';
import './App.css';
import { initDiagram } from './helpers/initDiagram';
import { useMemo } from 'react';
import { getDiagramNodes } from './helpers/getDiagramNodes';

export const App = () => {
  const handleModelChange = (changes) => {
    console.log('Diagram was changed');
  };

  const nodes = useMemo(() => getDiagramNodes(), []);

  return (
    <div className="h-[400px] w-[400px]">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={nodes}
        // linkDataArray={[
        //   { key: -1, from: 0, to: 1 },
        //   { key: -2, from: 0, to: 2 },
        //   { key: -3, from: 1, to: 1 },
        //   { key: -4, from: 2, to: 3 },
        //   { key: -5, from: 3, to: 0 },
        // ]}
        onModelChange={handleModelChange}
      />
    </div>
  );
};
