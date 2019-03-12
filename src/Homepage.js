import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return <div className='container text-center'>
        <h1 className='my-5 py-5'> Welcome To MyTeacher</h1>
        <p>please go to <Link to='/teachers'>/teachers/</Link></p>
    </div>
}

export default Homepage;
