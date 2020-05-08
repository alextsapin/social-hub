import React from 'react';

class Status extends React.Component {
    
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    
    render() {
        // Статус пользователя
        let text = '';
        if(this.props.status != null) {
            text = this.props.status;
        }
        return (
            <div className="status">
                {   
                    ! this.state.editMode 
                    ? <blockquote onDoubleClick={this.activateEditMode} >{text}</blockquote>
                    : <input autoFocus={true} onBlur={this.deActivateEditMode} className="form-control" value={text}/>
                }  
            </div>
        );
    }
}

export default Status;