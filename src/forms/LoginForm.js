import React, { Component } from "react";
import authService from "../services/auth.service";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowError: false,
      isRemember: false,
    };
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getWrongUserPass = this.getWrongUserPass.bind(this);
  }

  componentDidMount() {
    const user = authService.getCurrentUser();
    if (user && user.isremember) {
      this.props.history.push("/home");
      window.location.reload();
    }

    /*if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }*/
  }

  onUserNameChange(e) {
    this.setState({
      username: e.target.value,
      isShowError: false,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
      isShowError: false,
    });
  }

  getWrongUserPass() {
    if (this.state.isShowError) {
      if (
        this.state.username == "" ||
        this.state.username == null ||
        this.state.password == "" ||
        this.state.password == null
      ) {
        return (
          <p style={{ color: "red", marginTop: "15px", marginLeft: "-15px" }}>
            Tài khoản / mật khẩu đang trống
          </p>
        );
      } else {
        return (
          <p style={{ color: "red", marginTop: "15px", marginLeft: "0px" }}>
            Sai tài khoản hoặc mật khẩu
          </p>
        );
      }
    }
  }

  handleLogin(e) {
    e.preventDefault();
    authService
      .login(this.state.username, this.state.password, this.state.isRemember)
      .then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
          this.setState({
            isShowError: true,
          });
        }
      );
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              className="login100-form-title"
              style={{ backgroundImage: "url(images/bg-01.jpg)" }}
            >
              <span className="login100-form-title-1">ĐĂNG NHẬP</span>
              <img src="logo.png" width="200px" />
            </div>
            <form
              className="login100-form validate-form"
              onSubmit={this.handleLogin}
            >
              <div
                className="wrap-input100 validate-input m-b-26"
                data-validate="Username is required"
              >
                <span className="label-input100">
                  <strong>Tài khoản</strong>
                </span>
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Tên tài khoản"
                  onChange={this.onUserNameChange}
                />
                <span className="focus-input100" />
              </div>
              <div
                className="wrap-input100 validate-input m-b-18"
                data-validate="Password is required"
              >
                <span className="label-input100">
                  <strong>Mật khẩu</strong>
                </span>
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Mật khẩu"
                  onChange={this.onPasswordChange}
                />
                <span className="focus-input100" />
              </div>
              <div className="flex-sb-m w-full p-b-22">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                    onChange={() => {
                      if (this.state.isRemember) {
                        this.setState({
                          isRemember: false,
                        });
                      } else {
                        this.setState({
                          isRemember: true,
                        });
                      }
                    }}
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Ghi nhớ
                  </label>
                </div>
                <div>
                  <a href="#" className="txt1">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Đăng nhập</button>
              </div>
              {this.getWrongUserPass()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
