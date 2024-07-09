import { ReactDiagram } from 'gojs-react';
import './App.css';
import { initDiagram } from './helpers/initDiagram';
import { useMemo } from 'react';
import { getDiagramNodes } from './helpers/getDiagramNodes';
import { getDiagramLinks } from './helpers/getDiagramLinks';

export const App = () => {
  const handleModelChange = (changes) => {
    console.log('Diagram was changed');
  };

  const nodes = useMemo(() => getDiagramNodes(), []);
  const links = useMemo(() => getDiagramLinks(), []);

  return (
    <div className="h-screen w-screen">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={nodes}
        linkDataArray={links}
        onModelChange={handleModelChange}
      />
    </div>
  );
};
