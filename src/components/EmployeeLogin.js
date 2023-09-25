import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

    const EmployeeLogin = () => {
    const [isLabelVisible, setIsLabelVisible] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = false;
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('aaa', values);
       
        try {
            const response = await axios.post('https://localhost:7013/api/Employee/loginEmployee', null, {
                params: {
                  email: values.email,
                  password: values.password
                },
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
            if (response.status === 200) {
                console.log('response', response);
              const id = response.data.id;
              navigate('/employeedetail/' + id);
            } else {
              setError('An error occurred.');
              setIsLabelVisible(!isLabelVisible);
            }
          } catch (error) {
            // Handle network errors or other exceptions here
            setError('An error occurred.');
            setIsLabelVisible(!isLabelVisible);
            console.error('Axios Error:', error);
          }
          

          
        };


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                          onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    {isLabelVisible && <label>Label visible</label>}
                    <p>You are agree to aour terms and policies</p>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin