import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export type UsersListPropsType = {
    users: Array<UsersType>
    follow: any
    unfollow: any
    isFollowedInProgress: string[]
    onPageChanger: (page: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

export const UsersList: React.FC<UsersListPropsType> = (props) => (
  <div>
      <Paginator totalItemsCount={props.totalUsersCount}
                 pageSize={props.pageSize}
                 currentPage={props.currentPage}
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