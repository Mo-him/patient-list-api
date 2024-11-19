import React, { useState } from 'react';

import axios from 'axios';
function PatientDetail({ patient }) {


  const [editablePatient, setEditablePatient] = useState(patient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient({ ...editablePatient, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/patients/${editablePatient.id}`, editablePatient)
      .then(response => alert('Patient updated successfully!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h3>Patient Details</h3>
      <form>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={editablePatient.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={editablePatient.middleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={editablePatient.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={editablePatient.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editablePatient.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={editablePatient.mobile}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
}

export default PatientDetail;
