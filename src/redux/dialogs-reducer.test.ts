import {dialogsReducer, addMessageAC, deleteMessageAC, DialogsPageType} from "./dialogs-reducer";

let startState: DialogsPageType;
beforeEach(() => {
      startState = {
          dialogsData: [
              {
                  id: 1,
                  name: "Chris",
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
              },
              {
                  id: 2,
                  name: "Vicky",
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Victoria_Justice_2013.jpg"
              },
              {
                  id: 3,
                  name: "Mike",
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg"
              },
              {
                  id: 4,
                  name: "Alex",
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
              },
              {
                  id: 5,
                  name: "Ivan",
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
              },
          ],
          messagesData: [
              {id: "1", message: "Hello"},
              {id: "2", message: "What's up"},
              {id: "3", message: "Privet"},
          ],
      }
  }
)

test('new message should be added with correct text', () => {
    // 1. start data
    let action = addMessageAC('test text')
    // 2. action
    let endState = dialogsReducer(startState, action)
    // 3. expectation
    expect(endState.messagesData[3].message).toBe('test text');
    expect(endState.messagesData.length).toBe(4);
})

test('correct message should be removed', () => {
    let action = deleteMessageAC('2')
    let endState = dialogsReducer(startState, action)
    expect(endState.messagesData.length).toBe(2)
    expect(endState.messagesData[1].message).toBe('Privet')
})