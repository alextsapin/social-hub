import React from 'react';
import Contact from './contact';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

type PropsType = {
    id: number
    person: {
        userId: number
        fullName: number
        aboutMe: string | null
        photos: {
            small: string | null
            large: string | null
        }
        contacts: any
    }
}

const ProfileData = (props: PropsType) => {
    return (
        <table className="table table-sm table-striped">
            <tbody>
                <tr>
                    <th className="font-weight-bold">Немного о себе</th>
                    <th>{props.person.aboutMe === null || props.person.aboutMe === '' ? <NotInterestedIcon/> : props.person.aboutMe}</th>
                </tr>

                {Object.keys(props.person.contacts).filter(key => key !== 'mainLink').map(key => {
                    return <Contact key={key} title={key} value={props.person.contacts[key]}/>
                })}
            </tbody>
        </table>
    )
}

export default ProfileData;