import {IoMdAdd} from "react-icons/io";
import {Button} from "@heroui/react";
import {useNavigate} from "react-router-dom";

type Props = {
    url: string;
}

const AddNewBtn = ({url}: Props) => {
    const navigate = useNavigate();

    return (
        <Button
            onPress={() => navigate(url)}
            className="bg-blue-500 text-white font-semibold tracking-wide"
        >
            Add New
            <IoMdAdd className="text-xl mt-0.5 -ml-0.5"/>
        </Button>
    );
};

export default AddNewBtn;