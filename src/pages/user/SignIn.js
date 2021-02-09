import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings.js';
import { fireDbAuth } from '../../services/firebase';
import { Auth } from '../../services/Utils/Auth/Auth';
import { fetchAdminsList } from '../../services/Utils/DB/DB';

class LoginV1 extends React.Component {
  static contextType = PageSettings;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.context.handleSetPageSidebar(false);
    this.context.handleSetPageHeader(false);
    this.context.handleSetPageContentFullWidth(true);
  }

  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
    this.context.handleSetPageHeader(true);
    this.context.handleSetPageContentFullWidth(false);
  }
  // username: edwardantonyin@gmail.com
  // password: Y2qUYkmLxi5b

  async handleSubmit(event) {
    const { history } = this.props;
    event.preventDefault();

    if (!this.state.email || !this.state.password) {
      return alert('All fields are required');
    }

    const auth = new Auth();

    const response = await auth.SignIn(this.state.email, this.state.password);

    fireDbAuth.onAuthStateChanged((user) => {
      user.getIdToken(true).then(async (token) => {
        localStorage.setItem('utoken', token);
        history.push('/');
        // window.location.reload(false);
      });
    });

    // console.log(response);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    return (
      <div className="login login-v1">
        <div className="login-container">
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Color</b> Admin
              <small>responsive bootstrap 4 admin template</small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="login-body">
            <div className="login-content">
              <form className="margin-bottom-0" onSubmit={this.handleSubmit}>
                <div className="form-group m-b-20">
                  <input
                    type="text"
                    className="form-control form-control-lg inverse-mode"
                    placeholder="Email Address"
                    required
                    id="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group m-b-20">
                  <input
                    type="password"
                    className="form-control form-control-lg inverse-mode"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="checkbox checkbox-css m-b-20">
                  <input type="checkbox" id="remember_checkbox" />
                  <label htmlFor="remember_checkbox">Remember Me</label>
                </div>
                <div className="login-buttons">
                  <button type="submit" className="btn btn-success btn-block btn-lg">
                    Sign me in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginV1);