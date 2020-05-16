import React from 'react';
import stub from './spinner.gif';

// Функция, возвращающая крутилку для ImageLoader
const spinner = () => {
	return (
		<img src={stub} alt="spinner"/>
	);
}

export default spinner;