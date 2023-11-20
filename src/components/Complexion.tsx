import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';

const Complexion = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { complexions, selectedComplexion, setSelectedComplexion, setFaceColor, updateComplexion } = store;

    const handleComplexionClick = (index: number) => {
        setSelectedComplexion(index);
        if (user) updateComplexion(complexions[index]);
        else setFaceColor(complexions[index]);
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">

            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    {complexions.map((complexion, i) => {
                        const selected = selectedComplexion === i;
                        return (
                            <div key={i} onClick={() => handleComplexionClick(i)} style={{ backgroundColor: complexion, border: selected ? '4px solid white' : 'none' }} className="bg-white p-4 shadow-md rounded-full w-24 h-24 cursor-pointer"></div>
                        );
                    })}
                </div>
            </div>

        </div>
    );

});

export default Complexion;