import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    useDisclosure,
    addToast,
    Spinner,
} from "@heroui/react";
import {
    getAllSizesByPagination,
    changeSizeStatus,
    searchSizesByPagination,
    getSizesByStatusAndPagination
} from "@/services/sizeService.ts";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import type {SizeDTO} from "@/models/sizeDTO.ts";
import NotFound from "@/pages/notFound.tsx";
import { IoIosSwitch } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import EditStatus from "@/components/edit-status/page.tsx";
import {useAsyncList} from "@react-stately/data";
import CustomPagination from "@/components/custom-pagination/page.tsx";
import RowCountSelector from "@/components/rowCount-selector/page.tsx";
import StatusSelector from "@/components/status-selector/page.tsx";

interface metaProps {
    total: number,
    page: number,
    limit: number,
    totalPages: number,
}

interface PaginatedSizeResponseDTO {
    sizeList: SizeDTO[],
    meta: metaProps,
}

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
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(["5"]));
    const [selectedStatusKeys, setSelectedStatusKeys] = useState<Set<string>>(new Set(["active"]));
    const limit: number = Array.from(selectedKeys).map(key => parseInt(key, 10))[0];

    const {
        isLoading,
        isError,
        data = {sizeList: [], meta: {total: 0,  page, limit, totalPages: 0}}
    } = useQuery<PaginatedSizeResponseDTO>({
        queryKey: ['size-by-id', page, limit, Array.from(selectedStatusKeys),],
        queryFn: () =>
        {
            const isActiveSelected = selectedStatusKeys.has("active");
            const isInactiveSelected = selectedStatusKeys.has("inactive");

            if (isActiveSelected && !isInactiveSelected) {
                // Fetch only active sizes
                return getSizesByStatusAndPagination(1, { page, limit });
            } else if (isInactiveSelected && !isActiveSelected) {
                // Fetch only inactive sizes
                return getSizesByStatusAndPagination(0, { page, limit });
            } else {
                // Fetch all sizes
                return getAllSizesByPagination({ page, limit });
            }
        },
    });

    // Search handler
    const searchTextHandler = async () => {
        // Handle search logic here
        if (searchText.trim() === '') {
            // If search text is empty, refetch the original data
            await queryClient.invalidateQueries({ queryKey: ['size-by-id'] });
            return;
        }

        const response: PaginatedSizeResponseDTO = await searchSizesByPagination(searchText, {page: 1, limit});
        if (response && response.sizeList.length > 0) {
            // Update data with search results
            queryClient.setQueryData(['size-by-id', page, limit], {sizeList: response.sizeList, meta: response.meta});
        } else {
            // If no results found, you might want to clear the data or show a message
            queryClient.setQueryData(['size-by-id', page, limit], {sizeList: [], meta: {total: 0, page: 1, limit, totalPages: 0}});
        }
    }

    /*Change Status Btn*/
    const changeStatusHandler = async () => {
        await changeSizeStatus(status.sid, status.active ? 0 : 1).then(async (res) => {
            if (res.statusCode === 200) {
                addToast({
                    title: "Success!",
                    description: `Size has been ${status.active ? 'deactivated' : 'activated'} successfully.`,
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

    /*Sorting mechanism*/
    const list = useAsyncList({
        async load() {return {items: data.sizeList};},
        async sort({sortDescriptor}) {
            return {
                items: data.sizeList.sort((a, b) => {
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

    // Reset to first page when row count changes
    useEffect(() => {
        setPage(1);
    }, [limit, selectedStatusKeys]);

    // if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full">
            <div className="w-full flex flex-col lg:flex-row gap-4 justify-between mb-8">
                <Input
                    type="text"
                    placeholder="Search here..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') void searchTextHandler(); }}
                    className="w-full min-[450px]:w-2/3 md:w-1/2 lg:w-1/3"
                    endContent={<CiSearch
                        className="cursor-pointer"
                        onClick={searchTextHandler}
                    />}
                />
                <div className="flex gap-4">
                    <StatusSelector selectedKeys={selectedStatusKeys} setSelectedKeys={setSelectedStatusKeys} />
                    <Button
                        onPress={() => navigate("/admin-panel/sizes/add-sizes")}
                        className="bg-blue-500 text-white font-semibold tracking-wide"
                    >
                        Add New
                        <IoMdAdd className="text-xl mt-0.5 -ml-0.5"/>
                    </Button>
                </div>
            </div>

            {/*Table content*/}
            <Table
                aria-label="Example table with dynamic content"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                bottomContent={
                    <RowCountSelector selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}/>
                }
            >
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn
                            key={column.key}
                            allowsSorting={['id', 'size', 'createDate', 'createBy', 'modifyDate', 'modifyBy'].includes(column.key)}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={"No rows to display."}
                    loadingContent={<Spinner />}
                    loadingState={isLoading ? "loading" : "idle"}
                >
                    {data.sizeList.map((row: SizeDTO) =>
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

            {/*Pagination*/}
            <CustomPagination
                currentPage={page}
                pages={data.meta.totalPages}
                setPage={setPage}
            />

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