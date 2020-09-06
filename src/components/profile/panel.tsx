import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';

type PropsType = {
    setAvatarTC: (e: any) => void;
    activateEditMode: (e: any) => void;
}

const Avatar = (props: PropsType) => {
    let savePhoto = (e: any) => {
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
            <button type="submit" className="btn btn-lg btn-dark" onClick={props.activateEditMode}><SettingsIcon/></button>
        </form>
    );
}

export default Avatar;