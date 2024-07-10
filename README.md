# ValueBlue

1. Create a diagram and add

- 10K nodes (simple template with a color and a text on it)
- a shape (circle for example)
- 5k links (one link between every node/shape).
- a label for every link

2. Every element has at least different color and text on it. Also, every node and shape should
   be resizable.

3. Enable:

- linking tool
- link shifting tool
- relinking tool

4. Create a custom context menu (right click) for the nodes and for the links. Add one clickable
   element on the context menu, which can change the font size of the text. For the nodes to
   change twice as big as was before, for the links, twice as small.
   Implement a dropdown with nodes displayed on the diagram. When the user selects a node
   from the dropdown the diagram highlights the node in the canvas.

5. Above your diagram, create a saved icon.

6. Every time something changes on your diagram (ex. position, size, text, etc), switch the saved
   icon into saving icon for 5 seconds.

7. After that change back to saved.

## Installation

```sh
pnpm install
```

## To run

```sh
pnpm dev
```
