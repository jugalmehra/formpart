import React, { Component } from "react";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    isDirty: {
      email: false,
      password: false,
    },
    errors: {}
  };

  _handleOnChange = (field, value) => {
    const { user, isDirty } = this.state;
    user[field] = value;
    isDirty[field] = true;
    this.setState({ user, isDirty }, () => {
      this._validateForm();
    });
  };

  _validateForm() {
    const { user, errors, isDirty } = this.state;
    Object.keys(user).forEach((each) => {
      if (each === "email" && isDirty.email) {
        if (!user.email.trim().length) {
          errors.email = "*Required";
        } else if (
          user.email.trim().length &&
          !new RegExp(
            "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
          ).test(user.email)
        ) {
          errors.email = "Invalid Email";
        } else {
          delete errors[each];
          isDirty.email = false;
        }
      } else if (each === "password" && isDirty.password) {
        if (!user.password.trim().length) {
          errors[each] = "*Required";
        } else {
          delete errors[each];
          isDirty.password = false;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  _handleOnSubmit = (e) => {
    e.preventDefault();
    let isDirty = {
      email: true,
      password: true,
    };
    this.setState({ isDirty }, () => {
      let errors = this._validateForm();
      console.log(errors);
      if (!errors) {
        console.log("Make API call");
      }
    });
  };



  render() {
    const { user, errors } = this.state;

    return (
      <div className="app flex-column justify-content-center login-pages">
        <div className="container">
          <div className="login-logo-header">
            <img
              // src={require("../..//assets/img/ask-vaidya-logo.png")}
              alt="Company Logo"
              className="company-logo"
            />
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="card-group">
                <div className="card">
                  <div className="card-body">
                    <h2 className="login-heading">Welcome</h2>
                    <form onSubmit={this._handleOnSubmit}>
                      <label>Email</label>
                      <div className="mb-4">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            autoComplete={"off"}
                            value={user.email}
                            onChange={(e) =>
                              this._handleOnChange("email", e.target.value)
                            }
                          />
                        </div>
                        {errors && (
                          <div className="validation-error">{errors.email}</div>
                        )}
                      </div>
                      <label>Password</label>
                      <div className="mb-2">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className="fa fa-unlock"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) =>
                              this._handleOnChange("password", e.target.value)
                            }
                          />
                        </div>
                        {errors && (
                          <div className="validation-error">
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
