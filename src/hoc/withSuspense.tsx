import React from 'react'
import {Preloader} from "../components/common/Preloader/Preloader";

//HOC возвращает новую компоненту, а не JSX
export const withSuspense = (Component: any) => {
    //для lazy, в fallback указываем компоненту, кот. будет показываться пока ждем загрузки
    return (props: any) => <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </React.Suspense>
}

