import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {admin, user} from "@/util/commonUtils.ts";
import {useMemo, useState} from "react";
import {FaChevronDown} from "react-icons/fa6";

const rowCountOptions = [
    { key: admin, label: "Admin" },
    { key: user, label: "User" },
];

const AddUser = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([admin]));

    const selectedValue = useMemo(() => {
        const key = Array.from(selectedKeys)[0];
        return rowCountOptions.find(option => option.key === key)?.label || "";
    }, [selectedKeys]);

    return (
        <div>
            {/*Role Dropdown*/}
            <div className="flex flex-col gap-2 mb-4 w-1/4">
                <label>Role</label>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            endContent={<FaChevronDown className="text-[12px] ml-1"/>}
                            className="justify-end w-full"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Role selection"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
                    >
                        {rowCountOptions.map(option => (
                            <DropdownItem key={option.key} className="capitalize">
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default AddUser;