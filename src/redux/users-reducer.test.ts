import {userReducer, followSuccessAC, InitialStateType, unfollowSuccessAC} from './users-reducer'

let state: InitialStateType
beforeEach(() => {
    state = {
        usersData: [
            {
                id: 0, name: 'Kastus 0', followed: false, status: 'status 0',
                photos: {small: null, large: null}
            },
            {
                id: 1, name: 'Kastus 1', followed: false, status: 'status 1',
                photos: {small: null, large: null}
            },
            {
                id: 2, name: 'Kastus 2', followed: true, status: 'status 2',
                photos: {small: null, large: null}
            },
            {
                id: 3, name: 'Kastus 3', followed: true, status: 'status 3',
                photos: {small: null, large: null}
            }

        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isLoading: false,
        isFollowingInProgress: [],
        filter: {searchInput: '', friend: null}
    }
})

test('follow success', () => {
    const newState = userReducer(state, followSuccessAC(1))

    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[1].followed).toBeTruthy()
})
test('unfollow success', () => {
    const newState = userReducer(state, unfollowSuccessAC(3))

    expect(newState.usersData[3].followed).toBeFalsy()
    expect(newState.usersData[2].followed).toBeTruthy()
})