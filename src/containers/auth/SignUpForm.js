//React related imports
import React, { Component } from 'react';

//React-Redux imports
import { connect } from 'react-redux';

//Component Imports
import Button from '../../components/UI/Button';
import InputBox from '../../components/UI/InputBox';
import Label from '../../components/UI/Label';

//Redux Action import
import * as signUp from '../../store/actions/signup';

class SignUpForm extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        Login: {
            loginId: null,
            password: null
        },
    }

    onFieldChange = (fieldName, e) => {
        e.preventDefault();
        switch(fieldName){
            case 'firstName':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    firstName: e.target.value
                });
                break;
            case 'lastName':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    lastName: e.target.value
                });
                break;
            case 'email':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    email: e.target.value
                });
                break;
            case 'loginId':
                let login_loginId = {
                    ...this.state.Login,
                    loginId: e.target.value,
                };
                this.setState({
                    ...this.state,
                    Login: login_loginId
                });
                break;
            case 'password':
                let login_password = {
                    ...this.state.Login,
                    password: e.target.value,
                };
                this.setState({
                    ...this.state,
                    Login: login_password
                });
                break;
        }
    }

    signUp = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render = () => {

        return (
            <div className="signup-form">
                <h1>Sign Up</h1>
                <form onSubmit={this.signUp} >
                    <Label>FirstName</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your FirstName"
                        required="true"
                        value={this.state.firstName}
                        onChange={(e) => this.onFieldChange('firstName',e)}
                    />
                    <Label>LastName</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your LastName"
                        required="true"
                        value={this.state.lastName}
                        onChange={(e) => this.onFieldChange('lastName',e)}
                    />
                    <Label>Email</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your Email"
                        required="true"
                        value={this.state.email}
                        onChange={(e) => this.onFieldChange('email',e)}
                    />
                    <Label>UserName</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your UserName"
                        required="true"
                        value={this.state.Login.loginId}
                        onChange={(e) => this.onFieldChange('loginId',e)}
                    />
                    <Label>Password</Label>
                    <InputBox
                        type="password"
                        placeholder="Enter your Password"
                        required="true"
                        value={this.state.Login.password}
                        onChange={(e) => this.onFieldChange('password',e)}
                    />
                    <Button >Sign Up</Button>
                </form>
            </div>
        )
    }
}

const stateToProps = state => {
    return {
        loading: state.signUp.loading,
        error: state.signUp.error,
        isSuccess: state.signUp.success !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (signUpObj) => dispatch(signUp.signUp(signUpObj))
    }
}

export default connect(stateToProps, mapDispatchToProps)(SignUpForm);