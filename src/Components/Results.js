import React from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ReactComponent as PullSVG } from '../Assets/icons/pull-request.svg';
import { ReactComponent as ClosedSVG } from '../Assets/icons/issue-closed.svg';
import '../Styles/Results.css';

export default function Results(props) {

	// The following text limits have been applied:
	// - Issue title is limited to 50 characters
	// - Issue body is limited to 300 characters

	let noIcon = "";
	let closedIcon = <ClosedSVG className='ClosedIcon'/>;
	let pullIcon = <PullSVG className="PullIcon"/>;
	
	if(props.issues.length === 0) {
		return (
			<div className = "no-results"> No results found! </div>
		);
	}

	return (
		<Container>
			<Table responsive = "xl" striped bordered hover variant="dark">
					<thead>
					    <tr>
					      <th className = "th-title">Issue Title</th>
					      <th className = "th-desc">Issue Description</th>
					      <th className = "th-label">Issue Labels</th>
					      <th className = "th-type">Issue Type</th>
					    </tr>
					 </thead>
					 <tbody>
						{props.issues.map((issue) => (
							<tr>
								<td>
									<a href={issue.html_url} target="_blank" rel="noopener noreferrer">
										{issue.title.length > 50 ? issue.title.slice(0,50) + '...' : issue.title}
									</a>
								</td>
								<td>{issue.body.length > 300 ? issue.body.slice(0,300) + '...' : issue.body}</td>
								<td>
									{issue.labels.map((label) => (
									    <div className = "labels"> {label.name} </div>
									))}
								</td>
								<td>
									{issue.state === 'closed' ? closedIcon : noIcon}
									{issue.pull_request !== undefined ? pullIcon : noIcon}
								</td>
							</tr>
						))}
					</tbody>
			</Table>
		</Container>
	);	
};