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
    //логика для визуала, поэтому она в презентационной компоненте
    //делим общее количество юзеров на то, сколько их будет в 1 порции, получаем количество страниц
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    //массив с нумерацией страниц
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    //количество порций = количество страниц / размер порции
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    //локал стейт для кнопок prev/next для переключения порций
    let [portionNumber, setPortionNumber] = useState(1)
    //находим левую/правую пограничную страницу в порции
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
      <div className={styles.paginator}>
          {// если номер показываемой порции больше 1, то показать кнопку Prev с онкликом изменить номер показываемой порции на -1
              portionNumber > 1
                ? <button onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>
                : null}
          {pages
            //находим нужную порцию по пограничным страницам порции
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p =>
              <span key={Math.random()} className={props.currentPageNumber === p ? styles.selectedPage : styles.page}
                    onClick={() => {
                        props.onPageChanger(p)
                    }}>{p}</span>
            )}
          {//если общее количество порций больше, чем текущая порция, то показать кнопку Next
              // с онкликом изменить номер показываемой порции на +1
              portionCount > portionNumber
                ? <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
                : null}
      </div>
    )
}