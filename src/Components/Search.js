import React from 'react'
import '../Styles/Search.css';

export default function Search(props) {
	return (
		<div className = "search-page">
			<h1 className = "title"> GitHub Issue Viewer</h1>
			<form className = "text-center" onSubmit = {props.getIssues}>
				<input 
					className = 'search-bar'
					type='search'
					placeholder = "Paste a link to a GitHub Repo!"
					onChange = {props.handleChange}/>
			</form>
			<div className = "error-msg">{props.error}</div>
		</div>
	);
};