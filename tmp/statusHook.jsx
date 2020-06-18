import React, {useState, useEffect} from 'react';

const StatusHook = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if(this.props.id == this.props.userId) {
            setEditMode(true);
        }
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatusTC(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className="status">
            {   
                !editMode 
                ?<blockquote onClick={activateEditMode}>{status}</blockquote>
                :<input autoFocus={true} onBlur={deActivateEditMode} className="form-control" value={status} onChange={onStatusChange}/>
            }  
        </div>
    )
}

export default StatusHook;