import Header from '@/components/Header';
import dynamic from 'next/dynamic';
const DesktopLayout = dynamic(() => import('@/components/DesktopLayout'));
const TabletLayout = dynamic(() => import('@/components//TabletLayout'));
const MobileLayout = dynamic(() => import('@/components//MobileLayout'));
// import DesktopLayout from '@/components/DesktopLayout';
// import TabletLayout from '@/components/TabletLayout';
// import MobileLayout from '@/components/MobileLayout';

import { useEffect, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';

const Home = observer(() => {

  const { user } = useUser();
  const store = useContext(AppStoreContext);
  const { randomizePalette, fetchPalettes, closetMode, setClosetMode, handleModeChange, layout, setLayout } = store;

  useEffect(() => {
    randomizePalette();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setLayout('desktop');
      } else if (screenWidth >= 768) {
        setLayout('tablet');
      } else {
        setLayout('mobile');
      }
    };

    handleResize(); // Initial check

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    // Execute the fetchPalettes function when the component mounts
    if (user) {
      fetchPalettes();
    }

    // Register the beforeunload event listener to fetch palettes on page refresh
    const handlePageRefresh = () => {
      if (user) {
        fetchPalettes();
      }
    };

    // Add the event listener on component mount
    window.addEventListener('beforeunload', handlePageRefresh);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [user]);

  return (
    <>
      {/* <Header closetMode={closetMode}
        setClosetMode={setClosetMode}
        handleModeChange={handleModeChange} /> */}

      {layout === 'desktop' && <DesktopLayout />}
      {layout === 'tablet' && <TabletLayout />}
      {layout === 'mobile' && <MobileLayout />}

    </>
  );


});

export default Home;