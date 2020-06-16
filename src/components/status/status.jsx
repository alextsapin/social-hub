import React, {useState, useEffect} from 'react';

const StatusHooks = (props) => {

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

class Status extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        if(this.props.id == this.props.userId) {
            this.setState({
                editMode: true
            })
        }
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusTC(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
            
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }
    
    render() {
        return (
            <div className="status">
                {   
                    ! this.state.editMode 
                    ? <blockquote onClick={this.activateEditMode}>{this.props.status}</blockquote>
                    : <input autoFocus={true} onBlur={this.deActivateEditMode} className="form-control" value={this.state.status} 
                    onChange={this.onStatusChange}/>
                }  
            </div>
        );
    }
}

export default Status;