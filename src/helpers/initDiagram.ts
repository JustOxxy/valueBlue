import go from 'gojs';
import LinkShiftingTool from '../extensions/LinkShiftingTool';

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
    'resizingTool.isGridSnapEnabled': true,
    'undoManager.isEnabled': true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
    model: new go.GraphLinksModel({
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  diagram.toolManager.mouseDownTools.add(new LinkShiftingTool());
  // define a simple Node template
  diagram.nodeTemplate = new go.Node('Auto', { resizable: true, locationSpot: go.Spot.Center }) // the Shape will go around the TextBlock
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
    .add(
      new go.Shape('Circle', {
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        cursor: 'pointer',
        width: 80,
        height: 80,
      })
        // Shape.fill is bound to Node.data.color
        .bind('fill', 'color'),
      new go.TextBlock({ margin: 8, editable: true }) // some room around the text
        .bindTwoWay('text'),
    );

  diagram.linkTemplate = new go.Link({
    reshapable: true,
    resegmentable: true,
    relinkableFrom: true,
    relinkableTo: true,
    adjusting: go.LinkAdjusting.Stretch,
  }) // the whole link panel
    // remember the (potentially) user-modified route
    .bindTwoWay('points')
    // remember any spots modified by LinkShiftingTool
    .bindTwoWay('fromSpot', 'fromSpot', go.Spot.parse, go.Spot.stringify)
    .bindTwoWay('toSpot', 'toSpot', go.Spot.parse, go.Spot.stringify)
    .add(
      new go.Shape(), // the link shape, default black stroke
      new go.Shape({ toArrow: 'Standard' }),
      new go.TextBlock({ segmentOffset: new go.Point(0, -10), segmentOrientation: go.Orientation.Upright }) // this is a Link label
        .bind('text'),
    );

  return diagram;
};
