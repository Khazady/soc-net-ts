import React, {FC} from 'react'
import './App.css'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {HashRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import UsersContainer from './components/Users/UsersPage'
import {LoginPage} from './components/Login/LoginPage'
import {connect, Provider} from 'react-redux'
import {initializeAppTC} from './redux/app-reducer'
import {RootStateType, store} from './redux/store'
import {Preloader} from './components/common/Preloader/Preloader'
import {compose} from 'redux'
import {withSuspense} from './hoc/withSuspense'
import {Page404} from './components/common/Page404/Page404'

//antd
import 'antd/dist/antd.css'
import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import {AppHeader} from './components/Header/AppHeader'

const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout


// The component isn't included in the bundle (webpack collects all files into one); it will be in its own bundle and loaded only when needed
// This speeds up the initial load but is slower when we navigate to this component
const DialogsPage = React.lazy(() => import('./components/Dialogs/Dialogs'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
// To avoid wrapping on each re-render?
const SuspendedDialogs = withSuspense(DialogsPage)
const SuspendedProfile = withSuspense(ProfileContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializingApp: () => void }

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        //server errors/offline
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializingApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    // clear junk before comp dies
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        //we see preloader before compDidMount works
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        // In Profile, /:userId is the param for withRouter props (60)
        // ? after userId makes param optional, so if we haven't it in url, another profile will be uploaded(in component code)
        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                /*defaultOpenKeys={['My Profile']}*/
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Dialogs</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                                    <Menu.Item key="5"><Link to="/users">Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Others">
                                    <Menu.Item key="9"> <Link to="/news">News</Link>
                                    </Menu.Item>
                                    <Menu.Item key="10"> <Link to="/music">Music</Link>
                                    </Menu.Item>
                                    <Menu.Item key="11"> <Link to="/settings">Settings</Link>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
                                <Route path="/dialogs"
                                       render={() => <SuspendedDialogs/>}/>
                                <Route path="/profile/:userId?"
                                       render={() => <SuspendedProfile/>}/>
                                <Route path="/users"
                                       render={() => <UsersContainer/>}/>
                                <Route path="/news" component={News}/>
                                <Route path="/music" component={Music}/>
                                <Route path="/settings" component={Settings}/>

                                <Route path="/login" component={LoginPage}/>
                                <Route path={'/404'} render={() => <Page404/>}/>
                                <Redirect from={'*'} to={'/404'}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Social network prototype ©2020 Created by Mikhail Kalatsei
                </Footer>
            </Layout>
        )
    }
}


const mapStateToProps = (state: RootStateType) => ({
    isInitialized: state.app.isInitialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter, //for taking URI-params
    connect(mapStateToProps, {initializingApp: initializeAppTC}))(App)


//this component for correct work App.test
export const MainApp: FC = () => (
    //HashRouter for github pages
    <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
)