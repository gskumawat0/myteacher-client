import React, { Component } from 'react';




export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!localStorage.jwtToken) {
                this.props.removeError();
                this.props.addError('please signin first.');
                this.props.history.push('/auth/signin');
            }
        }
        componentWillUpdate(nextProps) {
            if (!localStorage.jwtToken) {
                this.props.removeError();
                this.props.addError('please signin first.');
                this.props.history.push('/auth/signin');
            }
        }

        render() {
            return <ComponentToBeRendered { ...this.props }/>
        }
    }

    return <Authenticate />
}
