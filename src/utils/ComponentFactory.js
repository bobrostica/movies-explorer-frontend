import FancyCheckbox from '../ui/FancyCheckbox/FancyCheckbox';
import CloseButton from '../ui/CloseButton/CloseButton';

const createComponentByType = (type) => {
  switch (type) {
    case 'save-control':
      return FancyCheckbox;
    case 'close-control':
      return CloseButton;
    default:
      return null;
  }
};

export default createComponentByType;
