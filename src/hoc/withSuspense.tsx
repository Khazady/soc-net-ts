import React from 'react'
import {Preloader} from "../components/common/Preloader/Preloader";

//WCP - wrapped component props
//HOC возвращает новую компоненту, а не JSX
export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    //для lazy, в fallback указываем компоненту, кот. будет показываться пока ждем загрузки
    return (props: WCP) => <React.Suspense fallback={<Preloader/>}>
        <WrappedComponent {...props}/>
    </React.Suspense>
}

