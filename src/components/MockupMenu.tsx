import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import MockupResult from './MockupResult';
import ImageDropzone from './ImageDropzone';

const MockupMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { shirts } = store;

    // const m_paths = [
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    //     "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    // ];

    return (

        <>

            <ImageDropzone />

            <br></br>

            <div className="grid grid-cols-3 gap-4">
                {shirts.map((path, index) => (
                    <div key={index} className="flex justify-center">
                        <MockupResult path={path} />
                    </div>
                ))}
            </div>

        </>

    );


});

export default MockupMenu;