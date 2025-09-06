import React, {useEffect} from 'react'
import {Paginator} from '../common/Paginator/Paginator'
import {User} from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, followTC, requestUsersTC, unfollowTC} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    selectCurrentPage,
    selectIsFollowingProgress,
    getPageSize,
    selectTotalUsersCount,
    getUsers,
    selectUsersFilter
} from '../../redux/users-selectors'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'

export const UsersList: React.FC = () => {

    //instead compDidMount
    useEffect(() => {
        // implementing links with query params at start of app

        //parsing query string into object (substr from 1st element cuz querystring library parsing ? to first key)
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter

        //transform query string into data for BLL
        if (parsed.page) actualPage = Number(parsed.page)
        //as string  because we can input 2 same params and it will turn into array of strings
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
        }
        //sending data from query string to api and bll
        dispatch(requestUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    //instead props from mstp
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(selectTotalUsersCount)
    const currentPage = useSelector(selectCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(selectUsersFilter)
    const isFollowingInProgress = useSelector(selectIsFollowingProgress)// array of users Ids

    const dispatch = useDispatch()
    //instead props from mdtp
    // Better not to spawn subscribers; pass via props instead of using useSelector in lower components?
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

    const history = useHistory()
    //synch URL every time we getting new filter/crntPage from BLL (from inputs to BLL, BLL to subscriber component and URL)
    useEffect(() => {
        let query: QueryParamsType = {}
        if(filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            //start url point
            pathname: '/users',
            //URI params from bll
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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

// types
type QueryParamsType = { term?: string, page?: string, friend?: string }