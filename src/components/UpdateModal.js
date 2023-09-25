
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  const UpdateModal = ({ id, employees, OnUpdateDataEmployee, OnEmployeeUpdated }) => {
    console.log('okkkk',id);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
      };
    

    const Emp = employees.find(employee => employee.id === parseInt(id));
    console.log("Reun:", Emp);


    
    const [editedEmp, setEditedEmp] = useState({
        id: Emp.id || '', 
        name: Emp.name || '',
        email: Emp.email,
        address: Emp.address,
        salary: Emp.salary || '',
      });

    
      const handleInputChange = (field, value) => {
        setEditedEmp(prevState => ({
          ...prevState,
          [field]: value
        }));
      };
      
      
    
      const handleSave = async (editedEmp) => {
        //const formattedDatePrev = editedReun.datePrev.split('T')[0]; // Extract just the date
    //const formattedDateReal = editedReun.dateReal.split('T')[0]; // Extract just the date
    
    
     
        const requestData = {
      id: parseInt(editedEmp.id),
      name: editedEmp.name,
      email: editedEmp.email, // Make sure it's in the expected date format
      address: editedEmp.address, // Make sure it's in the expected date format
      salary: editedEmp.salary,
    };
    console.log('aammm',requestData)
        try {
          // Utilisez la décomposition pour créer une copie sans références cycliques
      
          const response = await axios.put('https://localhost:7013/api/Employee/updateEmployee', requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            
            OnUpdateDataEmployee(requestData)
            OnEmployeeUpdated();
            toast.success('Mise à jour effectuée avec succès');
           
            
          } else {
            toast.error('Error while updating employee.');
          }

          handleClose();
        } catch (error) {
          toast.error('Error while updating employee:', error);
        }
      };
    
      if (!Emp) {
        return <div className="div">Employee not found</div>;
      }
    


  return (
    <>
    <a
href={"#"}
style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
onClick={handleShow}
> {Emp.id}

</a>

      <Modal show={show} onHide={handleClose} backdrop="static">
<Modal.Header closeButton>
<Modal.Title>Modifier un employee</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>N° Employee:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
defaultValue={editedEmp.id.toString()}
  readOnly={true}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Name:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedEmp.name}
onChange={e => handleInputChange('name', e.target.value)}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Email:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedEmp.email}
onChange={e => handleInputChange('email', e.target.value)}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Address:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedEmp.address}
onChange={e => handleInputChange('address', e.target.value)}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Salaire:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedEmp.salary}
onChange={e => handleInputChange('salary', e.target.value)}
/>
</div>
</div>
</Form.Group>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Annuler
</Button>
<Button variant="primary" onClick={() => handleSave(editedEmp)}>
Enregistrer
</Button>
</Modal.Footer>
</Modal>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default UpdateModal;