import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';

const ComplexionMenu = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { complexions, handleComplexionClick, selectedComplexion } = store;

    return (
        <div className="flex flex-col items-center justify-center h-full">

            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    {complexions.map((complexion, i) => {
                        const selected = selectedComplexion === i;
                        return (
                            <div key={i}
                                onClick={() => handleComplexionClick(user, i)}
                                style={{ backgroundColor: complexion, border: selected ? '4px solid white' : 'none' }}
                                className="bg-white p-4 shadow-md rounded-full w-24 h-24 cursor-pointer"></div>
                        );
                    })}
                </div>
            </div>

        </div>
    );

});

export default ComplexionMenu;