import React from 'react';
// Icons
import {GearIcon} from '../../icons/icons.js';

const Avatar = (props) => {

    let savePhoto = (e) => {
        if(e.target.files.length) {
            props.setAvatarTC(e.target.files[0]);
        }
    }

    return (
        <form className="panel">
            <div className="form-group mt-3">
                <label className="font-weight-bold">Загрузите фото профиля</label>
                <input onChange={savePhoto} type="file" className="form-control-file mt-3"/>
            </div>
            <button type="submit" className="btn btn-primary">Загрузить</button>
            <button type="submit" className="btn btn-dark ml-3" onClick={props.activateEditMode}><GearIcon/></button>
        </form>
    );
}

export default Avatar;