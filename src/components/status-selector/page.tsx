import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {FaChevronDown} from "react-icons/fa6";

const statusOptions = [
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
];

interface Props {
    selectedKeys: Set<string>;
    setSelectedKeys: (keys: Set<string>) => void;
}

const StatusSelector = ({selectedKeys, setSelectedKeys}: Props) => {

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color="default"
                    variant="ghost"
                    endContent={<FaChevronDown className="text-[12px] ml-1"/>}
                >
                    Status
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Select row count"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
            >
                {statusOptions.map(option => (
                    <DropdownItem key={option.key} className="capitalize">
                        {option.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default StatusSelector;