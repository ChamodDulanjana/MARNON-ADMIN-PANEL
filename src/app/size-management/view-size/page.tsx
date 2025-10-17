import {Input, Button} from "@heroui/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {useState} from "react";

const ViewSize = () => {
    const [searchText, setSearchText] = useState<string>('');

    const searchTextHandler = () => {
        // Handle search logic here
        console.log("Searching for:", searchText);
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-between">
                <Input
                    type="text"
                    placeholder="Search here..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') searchTextHandler(); }}
                    className="w-2/3 md:w-1/2 lg:w-1/3"
                    endContent={<CiSearch
                        className="cursor-pointer"
                        onClick={searchTextHandler}
                    />}
                />
                <Button className="bg-blue-500 text-white font-semibold tracking-wide" >
                    <IoMdAddCircleOutline className="text-xl -mr-1"/>
                    New
                </Button>
            </div>
        </div>
    );
};

export default ViewSize;