import React from 'react';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.buttonValid();
    });
  };

  buttonValid = () => {
    const passLength = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const { email, password } = this.state;
    if (password.length >= passLength && regexEmail.test(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleInputs }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleInputs }
        />
        <button
          type="button"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
