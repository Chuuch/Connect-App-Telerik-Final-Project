import { FC, useState } from 'react';
import { UserList } from '../Teams/CreateTeamForm';
import Dropdown from './Dropdown';


interface MultiSelectProps {
    selectedUsers: UserList[];
    setSelectedUsers: (selectedUsers: UserList[]) => void;
    list: UserList[]
}

const Multiselect: FC<MultiSelectProps> = ({ list, selectedUsers, setSelectedUsers }) => {
    // state showing if dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);

    const toogleDropdown = (e) => {
        e.preventDefault();
        setDropdown(!dropdown)
    };
    // adds new item to multiselect 
    const addTag = (item: UserList) => {
        const usersByUsernames = selectedUsers.map((e) => e?.name);
        const user = list.filter((e) => e?.name === item?.name && !usersByUsernames.includes(item?.name));

        setSelectedUsers(selectedUsers.concat(user));
        setDropdown(false);
    };
    // removes item from multiselect
    const removeTag = (item: UserList) => {
        const filtered = selectedUsers.filter((e) => e.name !== item?.name);
        setSelectedUsers(filtered);
    }

    return (<div className="autcomplete-wrapper">
        <div className="autcomplete">
            <div className="w-full flex flex-col items-center">
                <div className="p-1 flex border border-gray-200 bg-white rounded ">
                    <div className="flex flex-auto flex-wrap">
                        {
                            selectedUsers.map((tag, index) => {
                                return (
                                    <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{tag?.name}</div>
                                        <div className="flex flex-auto flex-row-reverse">
                                            <div onClick={() => removeTag(tag)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                        <div className="flex-1">
                            <input
                                placeholder={selectedUsers.length ? "" : "Members"}
                                className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"

                            />
                        </div>
                    </div>
                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={(e) => toogleDropdown(e)}>
                        <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {dropdown ? <Dropdown list={list} addItem={addTag}></Dropdown> : null}
    </div >)
};

export default Multiselect;