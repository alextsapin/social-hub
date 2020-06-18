import React from 'react';

const Avatar = (props) => {

    let savePhoto = (e) => {
        if(e.target.files.length) {
            props.setAvatarTC(e.target.files[0]);
        }
    }

    return (
        <form className="avatar">
            <div className="form-group mt-3">
                <label className="avatar__label">Загрузите фото профиля</label>
                <input onChange={savePhoto} type="file" className="form-control-file mt-3"/>
            </div>
            <button type="submit" className="btn btn-primary">Загрузить</button>
        </form>
    );
}

export default Avatar;