import React from 'react';
import ImageLoader from 'react-imageloader';
import spinner from '../spinner/spinner.jsx';

import logo from './../../images/my-logo.png';

const Footer = () => {
	return (
		<footer>	
			<div className="developer">
				<p className="developer__text">Develop by</p>
				<a rel="noopener noreferrer" target="_blank" href="https://facebook.com/aleksandr.tsapin/">
                    <ImageLoader className="developer__logo" src={logo} wrapper={React.createFactory('div')} 
                    preloader={spinner} alt="logo"></ImageLoader>
				</a>
				<p className="developer__text developer__text_copy">2020 SOCIAL NETWORK</p>
			</div>
		</footer>
	);
};

export default Footer;