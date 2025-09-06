import styles from './Paginator.module.css';
import React, {useState, FC} from 'react';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPageNumber: number
    onPageChanger: (page: number) => void
    portionSize: number
}

export const Paginator: FC<PropsType> = (props) => {
    // Divide total users by how many are in one portion to get the number of pages
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    // Array with page numbers
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    // Number of portions = number of pages / portion size
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    // Local state for prev/next buttons to switch portions
    let [portionNumber, setPortionNumber] = useState(1)
    // Find left/right boundary page in the portion
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
      <div className={styles.paginator}>
          {// If the displayed portion number is greater than 1, show Prev button to decrease portion number by 1
              portionNumber > 1
                ? <button onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>
                : null}
          {pages
            // Find the needed portion by its boundary pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p =>
              <span key={Math.random()} className={props.currentPageNumber === p ? styles.selectedPage : styles.page}
                    onClick={() => {
                        props.onPageChanger(p)
                    }}>{p}</span>
            )}
          {// If total portions exceed current portion, show Next button
              // with onClick increase portion number by +1
              portionCount > portionNumber
                ? <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
                : null}
      </div>
    )
}