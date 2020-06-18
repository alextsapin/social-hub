import React from 'react';

class Status extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        if(this.props.id === this.props.userId) {
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
        let style = '';
        if(this.props.id === this.props.userId) {
            style = 'status status__hover';
        } else {
            style = 'status';
        }

        return (
            <div className={style}>
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