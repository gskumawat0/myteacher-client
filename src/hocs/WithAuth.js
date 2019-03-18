import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

const withAuth = (ComponentToBeRendered)=>{
    class Authenticate extends Component {
        componentWillMount() {
            if (!window.localStorage.jwtToken) {
                this.props.addError('please signin first.');
                this.props.history.push('/auth/signin');
            }
        }
        componentWillUpdate(nextProps) {
            if (!window.localStorage.jwtToken) {
                this.props.addError('please signin first.');
                this.props.history.push('/auth/signin');
            }
        }

        render() {
            return <ComponentToBeRendered removeError={this.props.removeError} addError={this.props.addError} />
        }
    }
    return withRouter(Authenticate)
}

export default withAuth;