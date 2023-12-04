import './Paging.css';
import Pagination from 'react-js-pagination';

export default function Paging({ page, totalElements, size, setPage }) {
  const handlePageChange = (page) => {
    setPage(page);
  };
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
