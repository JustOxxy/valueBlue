import { SavedIcon } from '../assets/SavedIcon';
import { SavingIcon } from '../assets/SavingIcon';

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
