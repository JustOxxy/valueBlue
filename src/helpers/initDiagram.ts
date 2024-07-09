import go from 'gojs';

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
export const initDiagram = () => {
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const CellSize = new go.Size(20, 20);
  const diagram = new go.Diagram({
    grid: new go.Panel('Grid', { gridCellSize: CellSize })
      .add(new go.Shape('LineH', { strokeWidth: 0.5, stroke: 'lightgray' }))
      .add(new go.Shape('LineV', { strokeWidth: 0.5, stroke: 'lightgray' })),
    'animationManager.isEnabled': false,
    'draggingTool.dragsLink': true,
    'relinkingTool.isUnconnectedLinkValid': true,
    'linkingTool.isUnconnectedLinkValid': true,
    'draggingTool.isGridSnapEnabled': true,
    'draggingTool.gridSnapCellSpot': go.Spot.Center,
    'resizingTool.isGridSnapEnabled': true,
    'undoManager.isEnabled': true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
    model: new go.GraphLinksModel({
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = new go.Node('Auto', { resizable: true }) // the Shape will go around the TextBlock
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
    .add(
      new go.Shape()
        // Shape.fill is bound to Node.data.color
        .bind('fill', 'color')
        .bind('figure'),
      new go.TextBlock({ margin: 8, editable: true }) // some room around the text
        .bindTwoWay('text'),
    );

  return diagram;
};
