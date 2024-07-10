import { useRef, useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { ReactDiagram } from 'gojs-react';
import { useMemo } from 'react';
import { initDiagram } from '../helpers/initDiagram';

import { getDiagramNodes } from '../helpers/getDiagramNodes';
import { getDiagramLinks } from '../helpers/getDiagramLinks';
import { Dropdown } from './Dropdown';

export const Diagram = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuAnchor, setContextMenuAnchor] = useState({ x: 0, y: 0 });
  const [contextMenuNode, setContextMenuNode] = useState<go.Part | null>(null);
  const [contextMenuLink, setContextMenuLink] = useState<go.Part | null>(null);
  const diagramRef = useRef<go.Diagram | null>(null);

  const init = () => {
    const diagram = initDiagram({
      setContextMenuAnchor,
      setContextMenuNode,
      setContextMenuVisible,
      setContextMenuLink,
    });
    diagramRef.current = diagram;

    return diagram;
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
    setContextMenuLink(null);
    setContextMenuNode(null);
  };

  const handleMenuItemClick = (action: string) => {
    if (!contextMenuNode && !contextMenuLink) return;

    const diagramElement = contextMenuLink || contextMenuNode;

    // Get the diagram from the node
    const diagram = diagramElement?.diagram;

    if (!diagram) return;

    diagram.startTransaction('change element text size');

    const currentSize = diagramElement.data.fontSize || 14;

    if (action === 'Increase Text Size') {
      diagram.model.setDataProperty(diagramElement.data, 'fontSize', currentSize * 2);
    } else if (action === 'Decrease Text Size') {
      diagram.model.setDataProperty(diagramElement.data, 'fontSize', currentSize / 2);
    }

    diagram.commitTransaction('change element text size');

    diagram.requestUpdate();
    handleCloseContextMenu();
  };

  const handleOptionSelect = (option: string) => {
    const diagram = diagramRef.current;
    if (diagram) {
      diagram.startTransaction('highlight');
      diagram.clearHighlighteds();
      diagram.nodes.each((node) => {
        if (node.data.text === option) {
          node.isHighlighted = true;
        }
      });
      diagram.commitTransaction('highlight');
      diagram.requestUpdate();
    }
  };

  const handleModelChange = (changes) => {
    console.log('Diagram was changed');
  };

  const nodes = useMemo(() => getDiagramNodes(), []);
  const links = useMemo(() => getDiagramLinks(), []);

  return (
    <div>
      <div className="h-96 w-full">
        <ReactDiagram
          initDiagram={init}
          divClassName="w-full h-full border border-black"
          nodeDataArray={nodes}
          linkDataArray={links}
          onModelChange={handleModelChange}
        />
      </div>
      <ContextMenu
        isLinkSelected={!!contextMenuLink}
        anchorPoint={contextMenuAnchor}
        showMenu={contextMenuVisible}
        handleMenuItemClick={handleMenuItemClick}
      />
      <Dropdown dropdownOptions={nodes.map((node) => node.text)} onOptionSelect={handleOptionSelect} />
    </div>
  );
};
