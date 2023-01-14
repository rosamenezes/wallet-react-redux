import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

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

  handleEntrar = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(userEmail(email));
    history.push('/carteira');
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
          onClick={ this.handleEntrar }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
