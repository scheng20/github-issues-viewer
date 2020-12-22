import React from 'react'
import '../Styles/Filters.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Filters(props) {

	return (
		<Container>
			<Nav defaultActiveKey="all" as="ul">
			  <Nav.Item as="li">
			    <Nav.Link eventKey="all" onSelect = {props.handleSelection}> All Issues</Nav.Link>
			  </Nav.Item>
			  <Nav.Item as="li">
			    <Nav.Link eventKey="open" onSelect = {props.handleSelection}> Open Issues</Nav.Link>
			  </Nav.Item>
			  <Nav.Item as="li">
			    <Nav.Link eventKey="closed" onSelect = {props.handleSelection}> Closed Issues</Nav.Link>
			  </Nav.Item>
			  <Nav.Item as="li">
			    <Nav.Link eventKey="pull" onSelect = {props.handleSelection}> Pull Requests</Nav.Link>
			  </Nav.Item>
			</Nav>
		</Container>
	);	
};