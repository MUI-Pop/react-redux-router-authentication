//React related imports
import React, { Component } from 'react';

//React-Redux imports
import { connect } from 'react-redux';

//Component Imports
import Button from '../../components/UI/Button';
import InputBox from '../../components/UI/InputBox';
import Label from '../../components/UI/Label';

//Redux Action import
import * as authentication from '../../store/actions/authentication';

class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    }

    onUserNameChange = (e) => {
        let username = e.target.value;

        this.setState({
            ...this.state,
            username
        })
    }

    onPasswordChange = (e) => {
        let password = e.target.value;

        this.setState({
            ...this.state,
            password
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.username, this.state.password);
    }

    render = () => {
        return (
            <div className="login-form">
                <h1>Login To Continue</h1>
                <form onSubmit={this.submitLogin}>
                    <Label>Username</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your username"
                        required="true"
                        value={this.state.username}
                        onChange={this.onUserNameChange}
                    />
                    <Label>Password</Label>
                    <InputBox
                        type="password"
                        placeholder="Enter your password"
                        required="true"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                    <Button
                    >Login</Button>
                </form>
            </div>
        );
    }

}

const stateToProps = state => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuth: state.authentication.accessToken !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (username, password) => dispatch(authentication.authenticate(username, password))
    }
}

export default connect(stateToProps, mapDispatchToProps)(LoginForm);