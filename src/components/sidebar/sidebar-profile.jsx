import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';

class SidebarProfile extends React.Component {

	constructor(props) {
		super(props);
		const token = localStorage.getItem("utoken")
		let jwt = require('jsonwebtoken');
		const currentUser = token ? jwt.decode(token) : false;
		this.state = {
			profileActive: 0,
			currentUser: currentUser
		};
		this.handleProfileExpand = this.handleProfileExpand.bind(this);
	}

	handleProfileExpand(e) {
		e.preventDefault();
		this.setState(state => ({
			profileActive: !this.state.profileActive,
		}));
	}
  
	render() {
		return (
			<PageSettings.Consumer>
				{({pageSidebarMinify}) => (
					<ul className="nav">
						<li className={"nav-profile " + (this.state.profileActive ? "expand " : "")}>
							<Link to="/" onClick={this.handleProfileExpand}>
								<div className="cover with-shadow"></div>
								<div className="image image-icon bg-black text-grey-darker">
									<i className="fa fa-user"></i>
								</div>
								<div className="info">
									<b className="caret pull-right"></b>
									{this.state.currentUser.name}
									<small>
										<span className="label label-light">{this.state.currentUser.roles}</span>
									</small>
								</div>
							</Link>
						</li>
						<li>
							<ul className={"nav nav-profile " + (this.state.profileActive && !pageSidebarMinify ? "d-block " : "")}>
								<li><Link to="/"><i className="fa fa-cog"></i> Settings</Link></li>
								<li><Link to="/"><i className="fa fa-pencil-alt"></i> Send Feedback</Link></li>
								<li><Link to="/"><i className="fa fa-question-circle"></i> Helps</Link></li>
							</ul>
						</li>
					</ul>
				)}
			</PageSettings.Consumer>
		)
	}
}

export default SidebarProfile;