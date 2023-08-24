// import { useEffect, useState } from 'react';

// import { TABLET_WIDTH, MOBILE_WIDTH } from '../utils/constants';
// import throttleThisFunc from '../utils/utils';

// const useCurrentDeviceLayout = () => {
//   const [currentDeviceWidth, setCurrentDeviceWidth] = useState('desktop');

//   const updateCurrentLayout = () => {
//     if (window.innerWidth <= MOBILE_WIDTH) {
//       setCurrentDeviceWidth('mobile');
//       return;
//     }

//     if (window.innerWidth <= TABLET_WIDTH) {
//       setCurrentDeviceWidth('tablet');
//       return;
//     }

//     setCurrentDeviceWidth('desktop');
//   };

//   const throttledUpdateCurrentLayout = throttleThisFunc(
//     updateCurrentLayout,
//     1000,
//   );

//   useEffect(() => {
//     updateMoviesToShow();
//     window.addEventListener('resize', throttledUpdateMoviesToShow);

//     return () =>
//       window.removeEventListener('resize', throttledUpdateMoviesToShow);
//   }, []);

//   return throttledUpdateCurrentLayout();
// };

// export default useCurrentDeviceLayout;
