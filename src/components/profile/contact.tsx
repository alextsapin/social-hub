import React from 'react';

type propsType = {
    title: string;
    value: string;
}

const Contact: React.FC<propsType> = ({title, value}) => {
    return (
        <tr>
            <td className="font-weight-bold">{title}</td>
            <td>{value === null || value === '' ? '...' : value}</td>
        </tr>
    )
}

export default Contact;