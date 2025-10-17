import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip
} from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import type {SizeDTO} from "@/models/sizeDTO.ts";
import {getAllSizes} from "@/services/sizeService.ts";
import LoadingAnimation from "@/pages/loading.tsx";
import NotFound from "@/pages/notFound.tsx";

const columns = [
    { key: 'id', label: 'Id' },
    { key: 'size', label: 'Size' },
    { key: 'isActive', label: 'Status' },
    { key: 'createDate', label: 'Create Date' },
    { key: 'createBy', label: 'Create By' },
    { key: 'modifyDate', label: 'Modify Date' },
    { key: 'modifyBy', label: 'Modify By' },
];

const ViewSize = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('');

    const {
        isLoading,
        isError,
        data: sizeList = [],
    } = useQuery<SizeDTO[]>({
        queryKey: ['size-by-id'],
        queryFn: () => getAllSizes()
    });

    const searchTextHandler = () => {
        // Handle search logic here
        console.log("Searching for:", searchText);
        console.log(sizeList)
    }

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full">
            <div className="w-full flex justify-between mb-8">
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
                <Button
                    onPress={() => navigate("/admin-panel/sizes/add-sizes")}
                    className="bg-blue-500 text-white font-semibold tracking-wide"
                >
                    Add New
                    <IoMdAdd className="text-xl mt-0.5 -ml-0.5"/>
                </Button>
            </div>

            {/*Table content*/}
            <Table removeWrapper aria-label="Example table with dynamic content">
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {sizeList.map((row) =>
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={row.isActive ? "success" : "danger"} size="sm" variant="flat">
                                    {row.isActive ? 'Active' : 'Inactive'}
                                </Chip>
                            </TableCell>
                            <TableCell>{row.createDate && row.createDate.split('T')[0]}</TableCell>
                            <TableCell>{row.createBy}</TableCell>
                            <TableCell>{row.modifyDate && row.modifyDate.split('T')[0]}</TableCell>
                            <TableCell>{row.modifyBy}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewSize;