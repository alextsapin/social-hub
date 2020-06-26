import React from 'react';
import Contact from './contact.jsx';

const ProfileData = (props) => {

    console.log(props);

    return (
        <table className="table table-sm table-striped">
            <tbody>
                <tr>
                    <th className="font-weight-bold">Немного о себе</th>
                    <th>{props.person.aboutMe === null || props.person.aboutMe === '' ? '...' : props.person.aboutMe}</th>
                </tr>

                {Object.keys(props.person.contacts).filter(key => key !== 'mainLink').map(key => {
                    return <Contact key={key} title={key} value={props.person.contacts[key]}/>
                })}
            </tbody>
        </table>
    )
}

export default ProfileData;