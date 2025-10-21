import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";
import { PiShieldWarning } from "react-icons/pi";

type EditStatusProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    status: string;
    menu: string;
    method: () => void;
};

const EditStatus = ({isOpen, onOpenChange, onClose, status, menu, method} : EditStatusProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-2xl -mb-4">
                    <span className=" w-10 h-10 bg-amber-100 flex items-center justify-center rounded-md">
                        <PiShieldWarning className=" text-amber-500"/>
                    </span>
                </ModalHeader>
                <ModalBody className="flex flex-col gap-1 mb-4">
                    <p className=" font-semibold">Are you sure you want to {status} this {menu}?</p>
                    <p className="text-sm text-default-600">please confirm your action.</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="bg-white text-gray-700 border border-gray-400" onPress={onClose}>
                        Close
                    </Button>
                    <Button
                        className={`capitalize ${status === 'activate' ? `bg-green-200 text-green-800` : `bg-red-200 text-red-800`}`}
                        onPress={() => {
                            method();
                            onClose();
                        }}
                    >
                        {status}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditStatus;