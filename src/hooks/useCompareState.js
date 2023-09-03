import { useState } from 'react';
import { compareIsDeepEqual } from '../utils/utils';

const useCompareState = (base) => {
  const [baseState, setBaseState] = useState(base);
  const [isStateChanged, setIsStateChanged] = useState(false);

  const compareState = (newState) => {
    setIsStateChanged(!compareIsDeepEqual(baseState, newState));
  };

  const updateBaseState = (newBase) => {
    setBaseState(newBase);
    setIsStateChanged(false);
  };

  return { isStateChanged, updateBaseState, compareState };
};

export default useCompareState;
