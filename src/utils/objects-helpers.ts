//функция для изменения объекта в массиве, ищет массив по переданному айдишнику и изменяет в нём нужный параметр (как на TS написать??)
export const updateObjectInArray = (items: Array<object>, itemId: string, objPropName: keyof object, newObjProps: object) => {
    items.map((i: object) => {
        if (i[objPropName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i;
    })
}