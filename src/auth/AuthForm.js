import React, { Component } from 'react';
import axios from 'axios';
import { apiCall } from '../apiCall';
import { withRouter, Link } from 'react-router-dom';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            profileType: 'student'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        apiCall('post', `${process.env.REACT_APP_BASE_URL}/api/auth/${this.props.type}`, { ...this.state })
            .then(({ token, user, success, message }) => {
                if (!success) throw Error(message)
                if (token) {
                    window.localStorage.setItem('jwtToken', token);
                    axios.defaults.headers.common["Authorization"] = `${token}`;
                }
                else {
                    delete axios.defaults.headers.common['Authorization'];
                }
                this.setState({
                    email: '',
                    password: '',
                    profileType: 'student'
                })
                this.props.type === 'signin' ? this.props.history.push(`/${user.profileType}s`) : this.props.addsuccess(message)
            })
            .catch(err => this.props.addError(err.message || `something went wrong. please try again later.`));
    }

    render() {
        return (
            <div>
                <h1 className='text-center my-4'>{this.props.headText}</h1>
                <div className='col-md-7 mx-auto '>
                    <form method='post' onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name='email' onChange={this.handleChange} value={this.state.email} className="form-control" id="email" aria-describedby="email" placeholder="Enter email" required/>
                            { this.props.type === 'signup' && <small id="emailHelp" className="form-text text-muted">{`We'll never share your email with anyone else.`}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"  name='password' onChange={this.handleChange} value={this.state.password} className="form-control" id="password" placeholder="Password" required/>
                        </div>
                        {this.props.type === 'signup' && <div className="form-group form-check px-0">
                            <p className='mb-0 mx-0 px-0'>Sign up as: </p>
                            <div className='mx-4'>
                                <input type="radio" name='profileType' value='teacher' onChange={this.handleChange} className="form-check-input" id="teacherCheck" required/>
                                <label className="form-check-label mr-5" htmlFor="teacherCheck">Teacher</label>
                                <input type="radio" name='profileType'value='student' onChange={this.handleChange} className="form-check-input mx-4" id="studentCheck" />
                                <label className="form-check-label ml-5" htmlFor="studentCheck">Student</label>
                            </div>
                        </div>}
                        <button type="submit" className="btn btn-primary">{this.props.submitText}</button>
                    </form>
                    <p className='mb-0'>{ this.props.type === 'signin' ? <Link to='/auth/signup'>Need an account? Sign Up here </Link>
                        : <Link to='/auth/signin'>Already have a account. login here</Link>
                    }</p>
                </div>
            </div>
        )
    }
}

export default withRouter(AuthForm);
