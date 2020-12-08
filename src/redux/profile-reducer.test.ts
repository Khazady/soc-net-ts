import {profileReducer, addPostAC, deletePostAC, ProfilePageType} from "./profile-reducer";

let startState: ProfilePageType;
beforeEach(() => {
      startState = {
          postsData: [
              {id: "1", message: "Hi, how are you?", likesCount: 7},
              {id: "2", message: "It's my first post", likesCount: 53},
              {id: "3", message: "КУ", likesCount: 3},
          ],
          profile: null,
          status: ""
      }
  }
)

test('new post should be added', () => {
    // 1. start data
    let action = addPostAC('test text')
    // 2. action
    let endState = profileReducer(startState, action)
    // 3. expectation
    expect(endState.postsData.length).toBe(4);
    expect(endState.postsData[3].message).toBe('test text')
})

test('correct post should be removed', () => {
    let action = deletePostAC('1')
    let endState = profileReducer(startState, action)
    expect(endState.postsData.length).toBe(2)
})
test(`after deleting length shouldn't be decreased if ID is incorrect`, () => {
    let action = deletePostAC('1000')
    let endState = profileReducer(startState, action)
    expect(endState.postsData.length).toBe(3)
})
