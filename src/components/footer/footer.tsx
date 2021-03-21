import React from 'react';
import {Img} from 'react-image';
import Spinner from '../spinners/imageSpinner';

// IMG
import logo from './../../images/my-logo.png';

const Footer = () => {
	return (
		<footer>
			<div className="developer">
				<p className="developer__text">Develop by</p>
				<a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/bloodborne.gothic/">
					<Img className="developer__logo" src={[logo]} loader={<Spinner/>} alt="img"/>
				</a>
				<p className="developer__text developer__text_copy">2021 SOCIAL NETWORK</p>
			</div>
		</footer>
	);
};

export default Footer;
