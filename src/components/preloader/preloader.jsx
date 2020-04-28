import React from 'react';
import style from './preloader.module.css';
import loading from './loading.gif';

const Preloader = () => {
	return (
		<div id="content">
			<img className={style.image} src={loading}/>
		</div>
	);
}

export default Preloader;