import React, {useState} from 'react';

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
            {portionNumber > 1 && <button onClick={()=>{setPortionNumber(portionNumber - 1)}}>PREV</button>}
            
                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                        return <span 
                            key={p}
                            onClick={() => {props.onPageChanged(p)}}>{p}</span>
                    })
                }

            {portionCount > portionNumber && <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
	);
}

export default Pagination;