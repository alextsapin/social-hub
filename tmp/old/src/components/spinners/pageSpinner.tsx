import React from 'react';
import loading from './loaders/page.gif';

const PageSpinner = () => {
	return (
		<div id="content">
			<img className="preloader" src={loading} alt="preloader"/>
		</div>
	);
}

export default PageSpinner;