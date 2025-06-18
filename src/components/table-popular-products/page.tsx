import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, Pagination, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {useEffect, useState} from "react";
import type {PaginationDTO} from "@/models/PaginationDTO.ts";
import {getPopularProductsForAdmin} from "@/services/productService.ts";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";
import {useQuery} from "@tanstack/react-query";

type ColumnType = {
    name: string;
    uid: string;
};

type PopularItemType = {
    id: number;
    itemCode: string;
    name: string;
    category: string;
    sales: string;
}

const tableColumns: ColumnType[] = [
    { name: "ITEM CODE", uid: "item_code" },
    { name: "NAME", uid: "name" },
    { name: "CATEGORY", uid: "category" },
    { name: "SALES", uid: "sales" }
];

const TablePopularProducts = () => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const rowsPerPage = 5;

    // Build pagination dto
    const paginationDto: PaginationDTO = {
        page: page,
        limit: rowsPerPage,
    };

    // Use react-query to fetch popular products
    const {
        isLoading,
        isError,
        data = { productList: [], totalRows: 0 } // Default values to avoid undefined errors
    } = useQuery<{productList: PopularItemType[], totalRows: number}>({
        queryKey: ['products', page],
        queryFn: () => getPopularProductsForAdmin(paginationDto),
    });

    // If data is successfully fetched, extract product list and total rows
    const { productList, totalRows } = data;

    // Set pages based on total rows
    useEffect(() => {
        setPages(Math.ceil(totalRows / rowsPerPage));
    }, [totalRows]);

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full">
            <Card className="flex flex-col pb-0">
                <CardHeader className="">
                    <CardTitle>Popular products</CardTitle>
                    <CardDescription>Showing the latest popular products</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <Table
                        aria-label='Popular Products Table'
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={setPage}
                                />
                            </div>
                        }
                    >
                        <TableHeader columns={tableColumns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={"start"}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={productList} emptyContent={"No rows to display."}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell key={columnKey}>
                                            {columnKey === "item_code" && item.itemCode}
                                            {columnKey === "name" && item.name}
                                            {columnKey === "category" && item.category}
                                            {columnKey === "sales" && item.sales}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TablePopularProducts;