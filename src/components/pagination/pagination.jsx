import React from 'react';

// Постраничная навигация
const Pagination = (props) => {

    let pageCount = Math.ceil(props.count / props.size);
    let pages = [];

    for(let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    
	return (
		<div className="pagination">
            {
                pages.map(page => {
                    return <span onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page && 'pagination__link'}>{page}</span>}
                )
            }
        </div>
	);
}

export default Pagination;