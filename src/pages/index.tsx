import dynamic from 'next/dynamic';
const DesktopLayout = dynamic(() => import('@/components/DesktopLayout'));
// const TabletLayout = dynamic(() => import('@/components/TabletLayout'));
const MobileLayout = dynamic(() => import('@/components/MobileLayout'));

import { useEffect, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';

import { Layout } from './../lib/types';

import { Alert, Snackbar } from "@mui/material";

const Home = observer(() => {

  const { user } = useUser();
  const store = useContext(AppStoreContext);
  const { fetchGarments, fetchComplexion, initializeRandomComplexion, layout, setLayout, setUser,
    errorMessage, showErrorMessage, dismissErrorMessage,
    successMessage, showSuccessMessage, dismissSuccessMessage } = store;


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setLayout(Layout.Desktop);
      } else if (screenWidth >= 768) {
        setLayout(Layout.Tablet);
      } else {
        setLayout(Layout.Mobile);
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

    if (user) {
      setUser(user);
      fetchGarments();
      fetchComplexion();
    } else {
      initializeRandomComplexion();
    }

    // Register the beforeunload event listener to fetch palettes on page refresh
    const handlePageRefresh = () => {
      if (user) {
        setUser(user);
        fetchGarments();
        fetchComplexion();
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
      {layout === Layout.Desktop && <DesktopLayout />}
      {layout === Layout.Mobile && <MobileLayout />}
      {/* {layout === Layout.Tablet && <TabletLayout />} */}

      {showErrorMessage && (
        <Snackbar open={showErrorMessage} autoHideDuration={5000} onClose={dismissErrorMessage}>
          <Alert severity="error" onClose={dismissErrorMessage}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}

      {showSuccessMessage && (
        <Snackbar open={showSuccessMessage} autoHideDuration={5000} onClose={dismissSuccessMessage}>
          <Alert severity="success" onClose={dismissSuccessMessage}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );


});

export default Home;