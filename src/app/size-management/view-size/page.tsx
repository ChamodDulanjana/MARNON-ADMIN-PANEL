import {Input, Button} from "@heroui/react";
import { IoMdAddCircleOutline } from "react-icons/io";

const ViewSize = () => {
    return (
        <div className="w-full">
            <div className="w-full flex justify-between">
                <Input type="search" placeholder="Search here..." className="w-2/3 md:w-1/2 lg:w-1/3"/>
                <Button className="bg-blue-500 text-white font-semibold tracking-wide" >
                    <IoMdAddCircleOutline className="text-xl -mr-1"/>
                    New
                </Button>
            </div>
        </div>
    );
};

export default ViewSize;