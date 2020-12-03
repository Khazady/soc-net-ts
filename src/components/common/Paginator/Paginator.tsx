import styles from "./Paginator.module.css";
import React from "react";

export type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanger: (page: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
    //логика для визуала, поэтому она в презентационной компоненте
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p =>
                <span className={props.currentPage === p ? styles.selectedPage : styles.page}
                      onClick={() => {
                          props.onPageChanger(p)
                      }}>{p}</span>
            )}
        </div>
    )
}