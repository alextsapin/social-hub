import React from 'react';

const Contact = ({title, value}) => {
    return (
        <tr>
            <td className="font-weight-bold">{title}</td>
            <td>{value === null ? '...' : value}</td>
        </tr>
    )
}

export default Contact;