import React from "react";
import { withRouter } from "react-router-dom";
import { PageSettings } from "../../config/page-settings.js";
import { fireDbAuth } from "../../services/firebase";

class LoginV1 extends React.Component {
  static contextType = PageSettings;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.email || !this.state.password) {
      return alert("All fields are required");
    }

    fireDbAuth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log("1", res);
        fireDbAuth.onAuthStateChanged((user) => {
          console.log("2", user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-lg"
                  >
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
