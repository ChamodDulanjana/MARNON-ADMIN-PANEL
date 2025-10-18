import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip, Tooltip, useDisclosure, addToast
} from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import type {SizeDTO} from "@/models/sizeDTO.ts";
import {getAllSizes, changeSizeStatus} from "@/services/sizeService.ts";
import LoadingAnimation from "@/pages/loading.tsx";
import NotFound from "@/pages/notFound.tsx";
import { IoIosSwitch } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import EditStatus from "@/components/edit-status/page.tsx";
import {useAsyncList} from "@react-stately/data";


const columns = [
    { key: 'id', label: 'Id' },
    { key: 'size', label: 'Size' },
    { key: 'isActive', label: 'Status' },
    { key: 'createDate', label: 'Create Date' },
    { key: 'createBy', label: 'Create By' },
    { key: 'modifyDate', label: 'Modify Date' },
    { key: 'modifyBy', label: 'Modify By' },
    { key: 'actions', label: 'Actions' },
];

const ViewSize = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState<string>('');
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [status, setStatus] = useState<{active: boolean, sid: number}>({active: true, sid: 0});

    const {
        isLoading,
        isError,
        data: sizeList = [],
    } = useQuery<SizeDTO[]>({
        queryKey: ['size-by-id'],
        queryFn: () => getAllSizes()
    });

    /*Sorting mechanism*/
    const list = useAsyncList({
        async load() {return {items: sizeList};},
        async sort({sortDescriptor}) {
            return {
                items: sizeList.sort((a, b) => {
                    const first = (a as never)[sortDescriptor.column];
                    const second = (b as never)[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const searchTextHandler = () => {
        // Handle search logic here
        console.log("Searching for:", searchText);
        console.log(sizeList)
    }

    /*Change Status Btn*/
    const changeStatusHandler = async () => {
        await changeSizeStatus(status.sid, status.active ? 0 : 1).then(async (res) => {
            if (res.statusCode === 200) {
                addToast({
                    title: "Status Changed Successfully",
                    color: "success",
                });
                // Refresh data from backend (no full reload)
                await queryClient.invalidateQueries({ queryKey: ['size-by-id'] });
            } else {
                addToast({
                    title: "Status Change Failed",
                    color: "danger",
                    description: res.message,
                });
            }
            onClose();
        }).catch((error) => {
            const backendResponse = error.response?.data;
            addToast({
                title: "Status Change Failed",
                color: "danger",
                description: backendResponse?.message || "An unexpected error occurred.",
            });
            onClose();
        });
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
            <Table
                removeWrapper
                aria-label="Example table with dynamic content"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>
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
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Edit">
                                      <span className="text-lg text-default-600 cursor-pointer active:opacity-60">
                                        <CiEdit />
                                      </span>
                                    </Tooltip>
                                    <Tooltip content="Change Status">
                                      <span className="text-lg text-default-600 cursor-pointer active:opacity-70">
                                        <IoIosSwitch onClick={() => {
                                            setStatus({active: row.isActive, sid: row.id ? row.id : 0});
                                            onOpen();
                                        }}/>
                                      </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/*Edit status modal*/}
            <EditStatus
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                status={status.active ? "deactivate" : "activate"}
                menu={"size"}
                method={changeStatusHandler}
            />
        </div>
    );
};

export default ViewSize;