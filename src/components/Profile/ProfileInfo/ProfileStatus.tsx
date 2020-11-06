import React from 'react';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType, any> {
    state = {
        editMode: false,
        title: "YO"
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
    }
    render() {
        return (
          <>
              {this.state.editMode
                ?   <div>
                    <input autoFocus onBlur={this.deactivateEditMode} value={this.props.status}/>
                    </div>
                :   <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status}</span>
                    </div>}
          </>
        )
    }
}

export default ProfileStatus;