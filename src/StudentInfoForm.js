import React from 'react';


const StudentInfoForm = (props) => {
    let { studentName, enrollmentNo, contact } = props;
    return (
        <div>
            <h1 className='text-center my-3'>Student Credentials:</h1>
            <div className="form-group">
                <label htmlFor="name">Student Name:</label>
                <input type="text" onChange={props.handleChange} value={studentName} name='studentName' className="form-control" id="name" placeholder="student name" required/>
            </div>
            <div className="form-group">
                <label htmlFor="section">Section :</label>
                <select onChange={props.handleChange} id='section' name='section' className='form-control' required>
                    <option value=''>choose a section</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    <option value='E'>E</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="enrollment">Enrollment No.:</label>
                <input type="text" onChange={props.handleChange} value={enrollmentNo} name='enrollmentNo' className="form-control" id="enrollment" placeholder="school enrollment no." required/>
            </div>
            <div className="form-group">
                <label htmlFor="contact">Contact No.:</label>
                <input type="number" onChange={props.handleChange} value={contact} name='contact' className="form-control" id="contact" placeholder="contact no." required/>
            </div>
        </div>
    )

}

export default StudentInfoForm;
