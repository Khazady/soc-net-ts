import React from 'react'
import {Preloader} from "../components/common/Preloader/Preloader";

//WCP - wrapped component props
// The HOC returns a new component, not JSX
export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    // For lazy, specify in fallback the component that will be shown while waiting for loading
    return (props: WCP) => <React.Suspense fallback={<Preloader/>}>
        <WrappedComponent {...props}/>
    </React.Suspense>
}

