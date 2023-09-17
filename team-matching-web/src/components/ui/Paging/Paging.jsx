import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './Paging.css';
import Pagination from 'react-js-pagination';

export default function Paging({ page, totalElements, size, setPage }) {
  const handlePageChange = (page) => {
    setPage(page);
  };
  console.log(totalElements);
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={size}
      totalItemsCount={totalElements}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
}
