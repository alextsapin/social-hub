import React from 'react';
import stub from './lineloader.gif';

// Функция, возвращающая крутилку для ImageLoader
const lineloader = () => {
	return (
		<img src={stub} alt="spinner"/>
	);
}

export default lineloader;