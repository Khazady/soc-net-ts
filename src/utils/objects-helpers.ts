// Function to update an object in an array: finds the item by id and changes the required property (how to write it in TS??)
export const updateObjectInArray = (items: Array<object>, itemId: string, objPropName: keyof object, newObjProps: object) => {
    items.map((i: object) => {
        if (i[objPropName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i;
    })
}