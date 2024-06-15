
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useSearchParams } from 'react-router-dom';
export function PackagePaginator({ total_records, per_page, onPageClick }) {
    let [searchParams, setSearchParams] = useSearchParams();
    let cal_pages = total_records / per_page;
    let mod = total_records % per_page;
    let totalPages = mod > 0 ? Number(Math.trunc(cal_pages)) + 1 : Number(Math.trunc(cal_pages));
    // console.log(mod,totalPages,cal_pages.toFixed(0))
    const handlePageClick = (page) => {
        onPageClick(page);
        setSearchParams({ page: page })
    }
    return (
        <>
            <ResponsivePagination
                current={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
                total={totalPages ?? 0}
                onPageChange={(page) => handlePageClick(page)}
                maxWidth={300}
            />
        </>

    );
}
