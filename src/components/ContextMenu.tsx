import { CONTEXT_MENU_EXTRA_SPACE } from '../constants/constants';
import { Anchor } from '../models/Anchor';

interface ContextMenuProps {
  anchorPoint: Anchor;
  showMenu: boolean;
  handleMenuItemClick: (menuItem: string) => void;
  isLinkSelected: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorPoint,
  showMenu,
  handleMenuItemClick,
  isLinkSelected,
}) => {
  if (!showMenu) return null;

  return (
    <ul
      className="absolute z-50 bg-pink-200 p-1"
      style={{
        top: `${anchorPoint.y + CONTEXT_MENU_EXTRA_SPACE}px`,
        left: `${anchorPoint.x + CONTEXT_MENU_EXTRA_SPACE}px`,
      }}
    >
      {!isLinkSelected ? (
        <li onClick={() => handleMenuItemClick('Increase Text Size')}>Increase Text Size</li>
      ) : (
        <li onClick={() => handleMenuItemClick('Decrease Text Size')}>Decrease Text Size</li>
      )}
    </ul>
  );
};
