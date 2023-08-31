import { useState } from 'react';
import { isDeepEqual } from '../utils/utils';

const useCompareState = (base) => {
  const [baseState, setBaseState] = useState(base);
  const [isStateChanged, setIsStateChanged] = useState(false);

  const compareState = (newState) => {
    setIsStateChanged(!isDeepEqual(baseState, newState));
  };

  const updateBaseState = (newBase) => {
    setBaseState(newBase);
    setIsStateChanged(false);
  };

  return { isStateChanged, updateBaseState, compareState };
};

export default useCompareState;
