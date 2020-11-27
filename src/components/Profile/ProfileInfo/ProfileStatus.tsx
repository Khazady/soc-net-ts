import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatus: React.FC<ProfileStatusType> = (props) => {
    //синхронизируй компоненту с состоянием, когда меняется props.status
    useEffect(() => setStatus(props.status), [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        //отправляем в глобал стейт и на сервак, выходя из editMode
        props.updateUserStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    return (
      <>
          {editMode
            ? <div>
                <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            : <div>
                <span onDoubleClick={activateEditMode}>{props.status || "empty status"}</span>
            </div>}
      </>
    )
}
