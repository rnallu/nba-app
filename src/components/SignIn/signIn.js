import React from "react";

import RenderField from "../Widgets/RenderField/renderField";
import "./signin.css";
import { firebase } from "../../firebase";

class SignIn extends React.Component {
  state = {
    loading: false,
    registerError: "",
    formData: {
      email: {
        element: "input",
        label: "Email",
        value: "",
        config: {
          type: "text",
          name: "email",
          placeholder: "Enter you Email ID"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      password: {
        element: "input",
        label: "Password",
        value: "",
        config: {
          type: "password",
          name: "password",
          placeholder: "Enter you Password"
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      }
    }
  };

  handleChange = newState => {
    this.setState({
      formData: newState
    });
  };

  submitButton = () => {
    return this.state.loading ? (
      "Loading..."
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, true)}>Sign-In</button>{" "}
        <button onClick={event => this.submitForm(event, false)}>
          Register
        </button>
      </div>
    );
  };

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;
      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }

      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({
          loading: true,
          registerError: ""
        });

        if (type) {
          // Sign-in method
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch(error => {
              this.setState({
                loading: false,
                registerError: error.message
              });
            });
        } else {
          // Register method
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch(error => {
              this.setState({
                loading: false,
                registerError: error.message
              });
            });
        }
      }
    }
  };
  showError = () => {
    return this.state.registerError !== "" ? (
      <div className="errorMsg">{this.state.registerError}</div>
    ) : (
      ""
    );
  };
  render() {
    return (
      <div className="signin-page">
        <h3>Sign In / Register</h3>
        <form onSubmit={event => this.submitForm(event, null)}>
          <RenderField
            data={this.state.formData}
            onblur={newState => this.handleChange(newState)}
            change={newState => this.handleChange(newState)}
          />
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default SignIn;
