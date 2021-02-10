import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fireDbAuth } from '../../../services/firebase';

class DropdownProfile extends React.Component {
	constructor(props) {
		super(props);

		const token = localStorage.getItem("utoken")
		let jwt = require('jsonwebtoken');
		const currentUser = token ? jwt.decode(token) : false;

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			currentUser: currentUser
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	logOut() {
		fireDbAuth.signOut()
			.then(res => {
				localStorage.removeItem('utoken')
				// window.location.href="/login";
				// window.location.href
				window.location.reload();
			})
			.catch(err => {
				localStorage.removeItem('utoken')
				window.location.reload();
			})
	}

	render() {
		if (this.state.currentUser)
			return (
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown navbar-user" tag="li">
					<DropdownToggle tag="a">
						<div className="image image-icon bg-black text-grey-darker">
							<i className="fa fa-user"></i>
						</div>
						<span className="d-none d-md-inline">{this.state.currentUser.name}</span> <b className="caret"></b>
					</DropdownToggle>
					<DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
						<DropdownItem>Edit Profile</DropdownItem>
						<DropdownItem>Setting</DropdownItem>
						<div className="dropdown-divider"></div>
						<DropdownItem onClick={this.logOut}>Log Out</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			)
		else return (
			<Link to={"/login"} className="mt-3 mr-4">Log in</Link>
		);
	}
};

export default DropdownProfile;
