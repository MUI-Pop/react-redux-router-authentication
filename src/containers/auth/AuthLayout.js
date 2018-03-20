//React related imports
import React, { Component } from 'react';

//Import Login and SignUp Forms
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import { Route, Switch, withRouter } from 'react-router-dom';

import Button from '../../components/UI/Button';

class AuthLayout extends Component {

    state = {
        showLogin: true
    }

    renderLoginOrSignUp = () => {
        if (this.state.showLogin) {
            this.props.history.push('/login')
            this.setState({
                ...this.state,
                showLogin: false
            })
        } else {
            this.props.history.push('/signup');
            this.setState({
                ...this.state,
                showLogin: true
            })
        }
    }

    componentDidMount = () => {
        this.props.history.push('/login');
        this.setState({
            ...this.state,
            showLogin: false
        })
    }

    render = () => {

        const buttonText = this.state.showLogin ? 'Login' : 'Sign Up';
        const buttonClass = this.state.showLogin ? { 'margin-top' : '610px' } : { 'margin-top' : '500px' }

        return (
            <div>
                <div>
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/signup" component={SignUpForm} />
                    </Switch>
                </div>
                <div className="auth-layout"  style={buttonClass}>
                <h1>-OR-</h1>
                    <Button onClick={this.renderLoginOrSignUp}>
                        {buttonText}
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(AuthLayout);