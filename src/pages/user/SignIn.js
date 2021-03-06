import React from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
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
      errorTxt: '',
      alert: false
    };
    this.onDismiss = this.onDismiss.bind(this);
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

    if (response === "success") {
      this.setState({ errorTxt: '', alert: false });
      fireDbAuth.onAuthStateChanged((user) => {
        user.getIdToken(true).then(async (token) => {
          localStorage.setItem('utoken', token);
          history.push('/');
          window.location.reload();
        })
      });
    }
    else {
      this.setState({ errorTxt: response.message, alert: true });
    }
    // console.log(response);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onDismiss () {
    this.setState({
      alert: false,
      errorTxt: ''
    })
  }

  render() {
    return (
      <div className="login login-v1">
        <div className="login-container">
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Media</b> Suite
              <small>login with your credentials</small>
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
                <Alert color="success" isOpen={this.state.alert} toggle={this.onDismiss}>
                  <strong>{this.state.errorTxt}</strong>
                </Alert>
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
