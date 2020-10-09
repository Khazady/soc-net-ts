import React, {useEffect} from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from 'react-redux';
import { RootStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";

type ResponseData = {
    data: {
        resultCode: number,
        data: {
            id: number | null
            login: string | null
            email: string | null
        }
    }
}
export type HeaderContainerPropsType = {
    isAuth: boolean
    isLoading: boolean
    login: string | null
    setAuthUserData: (id: number|null, login: string|null, email: string|null) => void
}

function HeaderContainer(props: HeaderContainerPropsType) {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            //?????????????????????
            withCredentials: true
        })
          .then((response: ResponseData) => {
              if (response.data.resultCode === 0) {
                  let {id, email, login} = response.data.data;
                  //axios упаковывает в data и разраб сервера упаковал в data
                  props.setAuthUserData(id, email, login)
              }
          });
    })
    return <Header {...props}/>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);