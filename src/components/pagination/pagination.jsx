import React, {useState} from 'react';

// Icons
import {ArrowLeft, ArrowRight} from '../../icons/icons.js';

// Постраничная навигация
const Pagination = (props) => {

    let pageCount = Math.ceil(props.count / props.size);
    let pages = [];

    for(let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(props.count / props.size);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.size + 1;
    let rightPortionPageNumber = portionNumber * props.size;

	return (
		<div className="pagination">
            {portionNumber > 1 && <button className="pagination__link" onClick={()=>{setPortionNumber(portionNumber - 1)}}><ArrowLeft/></button>}
                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                        return (
                            <span onClick={() => {
                                props.onPageChanged(p)}} className={props.currentPage === p && 'pagination__link'}>{p}</span>
                        ); 
                    })
                }
            {
                portionCount > portionNumber && 
                <button className="pagination__link" onClick={()=>{setPortionNumber(portionNumber + 1)}}>
                    <ArrowRight/>
                </button>
            }
        </div>
	);
}

export default Pagination;