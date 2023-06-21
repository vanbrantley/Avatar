import Header from '@/components/Header';
import PaletteComponent from '@/components/Palette';
import Avatar from '@/components/Avatar';
import LabMenu from '@/components/LabMenu';
import ClosetMenu from '@/components/ClosetMenu';
import { useEffect, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';

const Home = observer(() => {

  const { user } = useUser();
  const store = useContext(AppStoreContext);
  const { randomizePalette, fetchPalettes, closetMode, setClosetMode, handleModeChange } = store;


  useEffect(() => {
    randomizePalette();
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
      <Header closetMode={closetMode}
        setClosetMode={setClosetMode}
        handleModeChange={handleModeChange} />

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="hidden md:block col-span-1 grid gap-0">
          <PaletteComponent />
        </div>
        <div className="md:col-start-2 md:col-span-6">
          <Avatar />
        </div>
        <div className="sm:col-span-3 xs:col-span-12">
          {!closetMode && <LabMenu />}
          {closetMode && <ClosetMenu />}
        </div>
      </div>

      <div className="background-overlay hidden md:block"></div>
    </>
  );


});

export default Home;