import { useState } from 'react';

const usePending = () => {
  const [isPending, setIsPending] = useState(false);

  const pendingFunc = async (promise) => {
    setIsPending(true);
    await promise;
    setIsPending(false);
  };

  return { isPending, pendingFunc };
};

export default usePending;
