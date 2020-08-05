import React from 'react';
import loading from './images/page.gif';

const PageSpinner = () => {
	return (
		<div id="content">
			<img className="preloader" src={loading} alt="preloader"/>
		</div>
	);
}

export default PageSpinner;