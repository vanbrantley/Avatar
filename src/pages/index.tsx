import dynamic from 'next/dynamic';
const DesktopLayout = dynamic(() => import('@/components/DesktopLayout/DesktopLayout'));
const TabletLayout = dynamic(() => import('@/components/TabletLayout/TabletLayout'));
const MobileLayout = dynamic(() => import('@/components/MobileLayout/MobileLayout'));

import { useEffect, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';

const Home = observer(() => {

  const { user } = useUser();
  const store = useContext(AppStoreContext);
  const { randomizePalette, fetchPalettes, fetchGarmentsFromDB, fetchShirts, layout, setLayout } = store;

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
      fetchGarmentsFromDB();
      fetchShirts();
    }

    // Register the beforeunload event listener to fetch palettes on page refresh
    const handlePageRefresh = () => {
      if (user) {
        fetchPalettes();
        fetchGarmentsFromDB();
        fetchShirts();
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
      {layout === 'desktop' && <DesktopLayout />}
      {layout === 'tablet' && <TabletLayout />}
      {layout === 'mobile' && <MobileLayout />}
    </>
  );


});

export default Home;