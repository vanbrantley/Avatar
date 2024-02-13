import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

const GroupDropdown = observer(() => {

    const store = useContext(AppStoreContext);
    const { groups, selectedGroup, setSelectedGroup } = store;

    const handleGroupChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const group = e.target.value;
        setSelectedGroup(group);
    };

    return (

        <div className="flex flex-col h-full">

            {/* Group Dropdown */}
            <p style={{ fontFamily: "Verdana" }}>Group: </p>
            <select value={selectedGroup} onChange={handleGroupChangeSelect}>
                <option value={'all'}>All</option>
                {groups.map((group, index) => {
                    const { id, name } = group;
                    return (
                        <option key={index} value={id}>{name}</option>
                    );
                })}
            </select>

        </div>

    );

});

export default GroupDropdown;