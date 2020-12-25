import {useSelector} from 'react-redux'
import React from 'react'
import {UsersList} from './UsersList'
import {Preloader} from '../common/Preloader/Preloader'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {getIsLoading} from '../../redux/users-selectors'


const UsersPage: React.FC = () => {
    const isLoading = useSelector(getIsLoading)
    return (
        <>
            {isLoading ? <Preloader/> : null}
            <UsersList/>
        </>
    )
}

export default compose<React.ComponentType>(withAuthRedirect)(UsersPage)
