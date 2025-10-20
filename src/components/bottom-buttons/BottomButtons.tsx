import {Button} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";

interface Props {
    backUrl: string;
}

const BottomButtons = ({backUrl}: Props) => {
    const navigate = useNavigate();

    return (
        <div className='w-full flex justify-end gap-4 mt-10'>
            {/*Back Btn*/}
            <Button
                onPress={() => navigate(`${backUrl}`)}
                className="bg-gray-200 text-gray-700 font-semibold tracking-wide"
            >
                <TbArrowBackUp className="-mr-1"/>
                Back
            </Button>

            {/*Save Btn*/}
            <Button
                type="submit"
                className="bg-blue-600 text-white font-semibold tracking-wide"
            >
                Save
                <FiSave className="mt-1 -ml-1"/>
            </Button>

        </div>
    );
};

export default BottomButtons;