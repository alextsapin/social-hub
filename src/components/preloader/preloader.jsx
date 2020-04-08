/* Подключим компоненты */
import React, { Component } from 'react';

// Подключим стили
import style from './preloader.module.css';

/* Прелоадер */
const preloader = () => {
	return (
		<div className={style.container}>
			<div className={style.rings}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default preloader;