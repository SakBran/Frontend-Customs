import React from 'react';
import { Pagination } from 'antd';

interface PaginationProps {
    total: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
    onPageSizeChange?: (current: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ total, pageIndex, pageSize, pageSizeOptions = [5, 10, 20, 50, 100], onPageChange, onPageSizeChange }) => {
    return (
        <Pagination
            showSizeChanger
            pageSizeOptions={pageSizeOptions}
            defaultPageSize={pageSize}
            current={pageIndex + 1}
            total={total}
            onChange={(page: number, pageSize: number) => onPageChange(page - 1, pageSize)}
            onShowSizeChange={(current: number) => onPageSizeChange && onPageSizeChange(current)}
        />
    );
};

export default PaginationComponent;
