import React from 'react';
import stub from './loaders/image.gif';

// Функция, возвращающая крутилку для ImageLoader
const ImageSpinner = () => {
	return (
		<img src={stub} alt="spinner"/>
	);
}

export default ImageSpinner;