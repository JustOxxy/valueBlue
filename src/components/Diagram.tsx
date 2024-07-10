// GoJsDiagram.js
import React, { useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { ReactDiagram } from 'gojs-react';
import { useMemo } from 'react';
import { initDiagram } from '../helpers/initDiagram';

import { getDiagramNodes } from '../helpers/getDiagramNodes';
import { getDiagramLinks } from '../helpers/getDiagramLinks';

export const Diagram = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuAnchor, setContextMenuAnchor] = useState({ x: 0, y: 0 });
  const [contextMenuNode, setContextMenuNode] = useState<go.Part | null>(null);
  const [contextMenuLink, setContextMenuLink] = useState<go.Part | null>(null);

  const init = () => {
    return initDiagram({ setContextMenuAnchor, setContextMenuNode, setContextMenuVisible, setContextMenuLink });
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

  const handleModelChange = (changes) => {
    console.log('Diagram was changed');
  };

  const nodes = useMemo(() => getDiagramNodes(), []);
  const links = useMemo(() => getDiagramLinks(), []);

  return (
    <div>
      <ReactDiagram
        initDiagram={init}
        divClassName="diagram-component"
        nodeDataArray={nodes}
        linkDataArray={links}
        onModelChange={handleModelChange}
      />
      <ContextMenu
        isLinkSelected={!!contextMenuLink}
        anchorPoint={contextMenuAnchor}
        showMenu={contextMenuVisible}
        handleMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
};
