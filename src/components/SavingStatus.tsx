import { SavedIcon } from '../icons/SavedIcon';
import { SavingIcon } from '../icons/SavingIcon';

interface SavingStatusProps {
  isSaving: boolean;
  className?: string;
}

export const SavingStatus: React.FC<SavingStatusProps> = ({ isSaving, className }) => {
  const finalClassName = 'flex flex-col items-center gap-1' + ' ' + className;

  return isSaving ? (
    <div className={finalClassName}>
      <SavingIcon />
      Saving...
    </div>
  ) : (
    <div className={finalClassName}>
      <SavedIcon />
      Saved!
    </div>
  );
};
