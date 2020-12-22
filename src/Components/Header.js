import React from 'react'
import '../Styles/Header.css';
import { ReactComponent as CloseSVG } from '../Assets/icons/close.svg';

export default function Header(props) {
	return (
		<div className = "header">
			GitHub Issue Viewer
			<div className = "url">
				{props.url}
				<CloseSVG className='closeIcon' onClick = {props.handleClick}/>
			</div>
		</div>
	);
};