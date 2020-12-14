import React, { FC } from "react";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import { UserType } from "../../types/commonTypes";

export type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFollowedInProgress: Array<number> // array of users Ids
    onPageChanger: (page: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

export const UsersList: FC<PropsType> = (props) => (
  <div>
      <Paginator totalItemsCount={props.totalUsersCount}
                 pageSize={props.pageSize}
                 currentPageNumber={props.currentPage}
                 onPageChanger={props.onPageChanger}
                 portionSize={10}/>
      {
          props.users.map(u => <User key={u.id}
                                     user={u}
                                     isFollowedInProgress={props.isFollowedInProgress}
                                     follow={props.follow} unfollow={props.unfollow}/>
          )
      }
  </div>
)