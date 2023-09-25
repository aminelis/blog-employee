import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

    const EmployeeDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get(`https://localhost:7013/api/Employee/getDetailEmployee?id=${id}`)
            .then(res => {
                // Assurez-vous de vérifier que la réponse contient des données avant de les définir
                if (res.data && res.data.length > 0) {
                    setEmployee(res.data[0]); // Utilisez le premier employé de la liste si plusieurs sont renvoyés
                }
            })
            .catch(err => console.log('axios err', err));
    }, []);
    const handleLogout = () => {
		{/*axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
    */}
    navigate('/start')
	}
    console.log('employee112',employee.name)
  return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            { /*<img src={`http://localhost:8081/images/`+employee.image} alt="" className='empImg'/> */}
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail;