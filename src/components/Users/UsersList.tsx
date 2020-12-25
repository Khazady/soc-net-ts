import React, {useEffect} from 'react'
import {Paginator} from '../common/Paginator/Paginator'
import {User} from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, followTC, requestUsersTC, unfollowTC} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'

export const UsersList: React.FC = () => {

    //instead compDidMount
    useEffect(() => {
        dispatch(requestUsersTC(currentPage, pageSize, filter))
    }, [])

    //instead props from mstp
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const isFollowingInProgress = useSelector(getIsFollowingProgress)// array of users Ids

    const dispatch = useDispatch()

    //instead props from mdtp
    //лучше не плодить субскрайберов и передать пропсами, чем юзать юзселектор в нижних компонентах?
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }
    const onPageChanger = (pageNumber: number) => {
        dispatch(requestUsersTC(pageNumber, pageSize, filter))
    }
    const onFilterChanger = (filter: FilterType) => {
        dispatch(requestUsersTC(1, pageSize, filter))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanger={onFilterChanger}/>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPageNumber={currentPage}
                       onPageChanger={onPageChanger}
                       portionSize={10}/>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  isFollowedInProgress={isFollowingInProgress}
                                  follow={follow} unfollow={unfollow}/>
            )}
        </div>
    )
}


