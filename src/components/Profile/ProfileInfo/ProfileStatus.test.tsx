//import {ProfileStatus} from "./ProfileStatus";
import React from "react";
//import {create} from "react-test-renderer"

// instance only for class components
// storybook better
describe('ProfileStatus component', () => {
    /* test('status from props should be in the state', () => {
        //фейковая отрисовка компоненты в вирт. дом
        const component = create(<ProfileStatus status={"test status"} updateUserStatus={()=>{}}/>);
        //инстанс - 1 экземпляр объекта принадлежащий классу (класс компонент)
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test status")
    }) */
    /* test('span should be displayed', () => {
        //фейковая отрисовка компоненты в вирт. дом
        const component = create(<ProfileStatus status={"test status"} updateUserStatus={()=>{}}/>);
        const root = component.root;
        //инстанс - 1 экземпляр объекта принадлежащий классу (класс компонент)
        //находим спан в компоненте
        let span = root.findByType("span")
        expect(span.length).toBe(1)
        expect(span).not.toBeNull()
    }) */
})