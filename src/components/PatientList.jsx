import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientDetail from './PatientDetail';
import './style.css'

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    mobile: ''
  });


  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/patients/${id}`)
      .then(() => setPatients(patients.filter(p => p.id !== id)))
      .then(response => alert('Patient delete successfully!'))
      .catch(error => console.error(error));
  };

  // const handleAdd = (newPatient) => {
  //   axios.post('http://localhost:3001/patients', newPatient)
  //     .then(response => setPatients([...patients, response.data]))
  //     .catch(error => console.error(error));
  // };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.email || !newPatient.mobile) {
      alert('Please fill out all required fields!');
      return;
    }

    axios.post('http://localhost:3001/patients', newPatient)
      .then(response => {
        setPatients([...patients, response.data]);
        setNewPatient({ firstName: '', middleName: '', lastName: '', dob: '', email: '', mobile: '' });
      })
      .catch(error => console.error('Error adding patient:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };



  return (
    <>

        <form onSubmit={handleAdd}>
          <h3>Add New Patient</h3>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={newPatient.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={newPatient.middleName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={newPatient.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={newPatient.dob}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newPatient.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={newPatient.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Patient</button>
        </form>

        {selectedPatient && <PatientDetail patient={selectedPatient} />}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr>
                <th>{patient.id}</th>
                <th>{patient.firstName} {patient.middleName} {patient.lastName}</th>
                <th><button onClick={() => setSelectedPatient(patient)}>View</button></th>
                <th><button onClick={() => handleDelete(patient.id)}>Delete</button></th>
              </tr>
            ))}
          </tbody>
        </table>










    </>
  );
}

export default PatientList;
