import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteConfirmation from './deleteConfirmation'
import { deleteEmployees, fetchEmployees, updateEmployee } from './actions/employeeActions'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import UpdateModal from './UpdateModal'

const Employee = () => {
  const employees = useSelector(state => state.employees.employees);
  console.log(employees)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDeleteEmployee = (employee) => {
    dispatch(deleteEmployees(employee));
  };

  const handleEmployeeUpdated = () => {
    dispatch(fetchEmployees());
  };

  const handleEmployeeDataUpdated = (id) => {
    // Update the list of reunions by fetching again
    dispatch(updateEmployee(id));
  };

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(employee => employee !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log('sel', selectedEmployees.length);
    if (selectedEmployees.length > 0) {
      setShow(true);
    } else {
      toast.error('Aucun élément sélectionné !');
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Parcourir les IDs des réunions sélectionnées et les supprimer
      for (const id of selectedEmployees) {
        const response = await axios.delete(`https://localhost:7013/api/Employee/DeleteEmployee?id=${id}`);
        
        if (response.status === 200) {
          console.log("Data deleted successfully!");
          handleDeleteEmployee(id);
          handleEmployeeUpdated();
          setSelectedEmployees([]);
          toast.success('Suppression effectuée avec succès');
        } else {
          toast.error("Error while deleting data.");
        }
      }
      setShow(false);
  
      
    } catch (error) {
      toast.error("Error while deleting data:", error);
    }
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <div className="row mt-3">
      <div className="col-md-3">
        <Link to="/create" className='btn btn-success'>Add Employee</Link>
      </div>
      <div className="col-md-5">
      <button style={{ borderRadius: '5px',color : 'red', marginBottom : '10px' }} onClick={handleShow}>
          <span className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>{" "}
          Supprimer
      </button>
    <Modal show={show} onHide={handleClose} backdrop="static">
<Modal.Header closeButton>
<Modal.Title>Êtes-vous sûr de vouloir supprimer cet employé ?</Modal.Title>
</Modal.Header>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Annuler
</Button>
<Button variant="primary" onClick={handleDeleteConfirmation}>
Oui, supprimer
</Button>
</Modal.Footer>
</Modal>
      </div>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return <tr key={employee.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
                <td>
                  <UpdateModal
                    id={employee.id}
                    employees={employees}
                    OnUpdateDataEmployee={handleEmployeeDataUpdated}
                    OnEmployeeUpdated={handleEmployeeUpdated}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;
