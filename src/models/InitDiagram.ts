import go from 'gojs';
import { Anchor } from './Anchor';

export interface InitDiagram {
  setContextMenuNode: (node: go.Part | null) => void;
  setContextMenuAnchor: (anchor: Anchor) => void;
  setContextMenuVisible: (isContextMenuVisible: boolean) => void;
  setContextMenuLink: (link: go.Part | null) => void;
}
