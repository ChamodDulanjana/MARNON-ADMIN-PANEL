import {Button} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import {FiSave} from "react-icons/fi";
import {TbArrowBackUp} from "react-icons/tb";
import { GrDocumentUpdate } from "react-icons/gr";

interface Props {
    backUrl: string,
    mode: 'edit' | 'new',
}

const BottomButtons = ({backUrl, mode}: Props) => {
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
                {mode === 'new' ? 'Save' : 'Update'}
                {mode === 'new' ? <FiSave className="mt-0.5 -ml-0.5"/> : <GrDocumentUpdate className="mt-0.5 -ml-0.5"/>}
            </Button>

        </div>
    );
};

export default BottomButtons;