import { UserList } from '../Teams/CreateTeamForm';
import { FC } from 'react';

interface DropdownProps {
    list: UserList[];
    addItem: (item: UserList) => void
}

const Dropdown: FC<DropdownProps> = ({ list, addItem }) => {

    return (
        <div id="dropdown" className="absolute shadow top-100 bg-white z-40  lef-0 rounded max-h-select overflow-y-auto w-52 ">
            <div className="flex flex-col">
                {list.map((item, key) => {
                    return <div key={item.username + key}
                        className="cursor-pointer  border-gray-100 rounded-t border-b hover:bg-teal-100"
                        onClick={() => addItem(item)}>
                        <div className="flex  items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" >
                            <div className=" items-center flex">
                                <   div className="mx-2 leading-6  ">
                                    {item?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Dropdown;