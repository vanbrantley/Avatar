import { ReactNode, useEffect } from 'react';

interface ILayoutProps {
    children: ReactNode;
}

const Layout = (props: ILayoutProps) => {

    useEffect(() => {
        const handleResize = () => {
            const zoom = 1.25; // Adjust this value based on your desired zoom level
            const windowHeight = window.innerHeight / zoom;
            document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
        };

        // Call the handleResize function initially and on window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div style={{ height: 'var(--vh)', overflow: 'hidden' }}>{props.children}</div>
};

export default Layout;