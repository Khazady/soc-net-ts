import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType, any> {
    state = {
        editMode: false,
        //вставляем из глобал стейта в локал
        status: this.props.status
    }
    //этот медот склеит этот объект со стейтом, перезатирая свойства и вызывая перерисовку
    //ассинхронный, поэтому лог ниже выдаст всё равно false
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
        //false
        console.log(this.state.editMode)
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        //отправляем в глобал стейт и на сервак, выходя из editMode
        this.props.updateUserStatus(this.state.status)
    }
    //отправляем в локал стейт вводимое значение в инпут, вызывая перерисовку
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        // *|| если пустой статус, то в спане empty status, а в инпуте вместо пустоты, то, что в глобальном стейте
        return (
          <>
              {this.state.editMode
                ?   <div>
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status || this.props.status}/>
                    </div>
                :   <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status || "empty status"}</span>
                    </div>}
          </>
        )
    }
}

export default ProfileStatus;