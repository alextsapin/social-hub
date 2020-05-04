import React from 'react';
import loading from './loading.gif';

const Preloader = () => {
	return (
		<div id="content">
			<img className="preloader" src={loading}/>
		</div>
	);
}

export default Preloader;