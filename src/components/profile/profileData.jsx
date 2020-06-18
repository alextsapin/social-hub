import React from 'react';

import Contact from './contact.jsx';

const ProfileData = (props) => {

    return (
        <div>
            <table className="table table-sm table-striped">
                <tbody>
                    <tr>
                        <th className="font-weight-bold">Немного о себе</th>
                        <th>{props.person.aboutMe === null ? '...' : props.person.aboutMe}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-bold">В поиске работы?</th>
                        <th>{props.person.lookingForAJob === false ? '...' : props.person.lookingForAJob}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-bold">Причина поиска</th>
                        <th>{props.person.lookingForAJobDescription === null ? '...' : props.person.lookingForAJobDescription}</th>
                    </tr>

                    {Object.keys(props.person.contacts).filter(key => key !== 'mainLink').map(key => {
                        return <Contact key={key} title={key} value={props.person.contacts[key]}/>
                    })}
                </tbody>
            </table>

            <button className="btn btn-danger mt-2 mb-2" onClick={props.activateEditMode}>Редактировать</button>
        </div>
    )
}

export default ProfileData;