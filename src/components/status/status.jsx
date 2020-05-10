import React from 'react';

class Status extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
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
    
    render() {

        let text = '';
        if(this.props.status != null) {
            text = this.props.status;
        }
        else {
            text = 'status is empty...';
        }

        return (
            <div className="status">
                {   
                    ! this.state.editMode 
                    ? <blockquote onDoubleClick={this.activateEditMode}>{this.props.status}</blockquote>
                    : <input autoFocus={true} onBlur={this.deActivateEditMode} className="form-control" value={this.state.status} 
                    onChange={this.onStatusChange}/>
                }  
            </div>
        );
    }
}

export default Status;