import React from 'react';

// Постраничная навигация
const Pagination = (props) => {
	return (
		<div className="pagination">
            {
                props.pages.map(page => {
                    return <span onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page && 'pagination__link'}>{page}</span>}
                )
            }
        </div>
	);
}

export default Pagination;