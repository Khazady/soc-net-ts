import { create } from "react-test-renderer"
import {Paginator} from "./Paginator";
import React from "react";

describe("Paginator component tests", () => {
    test("pages count is 16 but should be showed only 15", () => {
        const component = create(<Paginator totalItemsCount={16} pageSize={1} currentPage={1} onPageChanger={()=>{}} portionSize={15}/>)
        const root = component.root
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(15)
    })
    test("if pages count is more then 15 button Next should be present", () => {
        const component = create(<Paginator totalItemsCount={16} pageSize={1} currentPage={1} onPageChanger={()=>{}} portionSize={15}/>)
        const root = component.root
        let spans = root.findAllByType("button");
        expect(spans.length).toBeTruthy()
    })
})