import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

	const AddEmployee = () => {
	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
	const navigate = useNavigate()




    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://localhost:7013/api/Employee/addEmployee', null, {
				params: {
				  name: name,
				  email: email,
				  password: password,
				  salary: salary,
				  address: address,
				  image: image
				}
			  });
          console.log('Creating emp...',response);
    
          if (response.status === 200) {
            navigate('/employee')
      
    
            //toast.success('Ajout effectué avec succès');
            // Reset the form after successful creation
            setName('');
			setEmail('');
			setPassword('');
			setSalary('');
			setAddress('');
			setImage('');
            console.log('Response:', response);
          } else {
            console.error('Error while creating reunion.');
            //toast.error('Error while creating reunion.');
          }
        } catch (error) {
          console.error('Error while creating reunion:', error);
         // toast.error('Error while creating reunion.');
        }
      };
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Employee</h2>
			<form className="row g-3 w-50" >
			<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					value={name}
					onChange={(e) => setName(e.target.value)}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					value={email}
					onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
					value={password}
					 onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					value={salary}
					onChange={(e) => setSalary(e.target.value)}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					value={address}
					onChange={(e) => setAddress(e.target.value)}/>
				</div>
				<div className="col-12 mb-3">
					<label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
					<input type="file" className="form-control" id="inputGroupFile01"
					onChange={(e) => {
						if (e.target.files.length > 0) {
						  const fileName = e.target.files[0].name;
						  setImage(fileName);
						}
					  }}/>
				</div>
				<div className="col-12">
					<button type="button" onClick={handleSubmit} className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default AddEmployee