import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa6";

const rowCountOptions = [
    { key: "5", label: "5" },
    { key: "10", label: "10" },
    { key: "15", label: "15" },
];

interface Props {
    selectedKeys: Set<string>;
    setSelectedKeys: (keys: Set<string>) => void;
}

const RowCountSelector = ({selectedKeys, setSelectedKeys}: Props) => {

    const selectedValue = useMemo(() => {
        const key = Array.from(selectedKeys)[0];
        return rowCountOptions.find(option => option.key === key)?.label || "";
    }, [selectedKeys]);

    return (
        <div className="flex justify-end pr-4 mt-2">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="faded" endContent={<FaChevronDown className="text-[12px] ml-1"/>}>
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Select row count"
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
    );
};

export default RowCountSelector;
