import {followSuccessAC, followTC, toggleFollowingProgressAC, unfollowSuccessAC, unfollowTC} from './users-reducer'
import {usersAPI} from '../api/user-api'
import {ApiResponseType, ResultCodes} from '../api/api'
//we need to check how thunks change bll, not api, so we replace real one with fake api
jest.mock('../api/user-api')
let userApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const fakeResponse: ApiResponseType = {
    data: {},
    resultCode: ResultCodes.Success,
    messages: []
}
//fake api returns fake response
userApiMock.followUser.mockReturnValue(Promise.resolve(fakeResponse))
userApiMock.unfollowUser.mockReturnValue(Promise.resolve(fakeResponse))

//fake dispatch
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('succeeded follow thunk', async () => {
    const thunk = followTC(1)
    
    await thunk(dispatchMock, getStateMock, {})
    //dispatch was called 3 times, just like in we use it 3 time in followTC
    expect(dispatchMock).toBeCalledTimes(3)
    //1st 2nd 3d calls with which object
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgressAC(false, 1))
})
test('succeeded unfollow thunk', async () => {
    const thunk = unfollowTC(1)

    await thunk(dispatchMock, getStateMock, {})
    //dispatch was called 3 times, just like in we use it 3 time in followTC
    expect(dispatchMock).toBeCalledTimes(3)
    //1st 2nd 3d calls with which object
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgressAC(false, 1))
})
