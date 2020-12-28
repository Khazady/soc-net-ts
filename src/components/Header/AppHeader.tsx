import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logoutTC} from '../../redux/auth-reducer'
import {Avatar, Button, Col, Image, Layout, Menu, Row, Typography} from 'antd'
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors'

const {Header} = Layout


export const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()
    const logout = () => dispatch(logoutTC())
    return (
        <Header>
            <Row>
                <Col span={4}>
                    <Image
                        width={'69px'}
                        src="https://i.ibb.co/HN350sc/70a3b023-88a2-4ebb-a063-784ca54ae184-200x200.png"
                        alt="logo"/></Col>
                <Col span={16}>
                    <Menu theme="dark"
                          mode="horizontal">
                        <Menu.Item key="1">In Progress</Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ?
                    <>
                        <Col span={1}>
                            <Avatar size={40}>{login}</Avatar>
                        </Col>
                        <Col span={3}>
                            <Button onClick={logout}>Log Out</Button>
                        </Col>
                    </>
                    :
                    <Col span={4}>
                        <Button><Link to={'/login'}>Login</Link></Button>
                    </Col>
                }
            </Row>
        </Header>
    )
}