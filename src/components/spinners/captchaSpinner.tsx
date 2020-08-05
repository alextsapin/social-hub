import React from 'react';
import stub from './images/captcha.gif';

// Функция, возвращающая крутилку для ImageLoader
const CaptchaSpinner = () => {
	return (
		<img src={stub} alt="spinner"/>
	);
}

export default CaptchaSpinner;