import React, {ChangeEvent, useEffect, useState, FC} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus: FC<PropsType> = (props) => {
    //синхронизируй компоненту с состоянием, когда меняется props.status
    useEffect(() => setStatus(props.status), [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        //отправляем в глобал стейт и на сервак, выходя из editMode
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    return (
      <>
          <b>Status: </b>
          {editMode
            ? <span>
                <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode}
                       value={status}/>
            </span>
            : <span>
                <span onDoubleClick={activateEditMode}>{props.status || "empty status"}</span>
            </span>}
      </>
    )
}
