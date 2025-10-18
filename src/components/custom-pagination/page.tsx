import {Pagination} from "@heroui/react";

interface Props {
    currentPage: number;
    pages: number;
    setPage: (page: number) => void;
}

const CustomPagination = ({currentPage, pages, setPage}: Props) => {
    return (
        <div className="flex w-full justify-center mt-6">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={pages}
                onChange={(page) => setPage(page)}
            />
        </div>
    );
};

export default CustomPagination;