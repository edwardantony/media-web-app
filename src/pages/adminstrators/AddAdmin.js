import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { addAdmin } from '../../services/Utils/DB/DB';

export const AddAdmin = () => {
  const AddNewAdmin = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = new FormData();
    form_data.append('firstName', firstname);
    form_data.append('lastName', lastname);
    form_data.append('phoneNumber', phonenumber);
    form_data.append('role', user_roles);
    form_data.append('email', email);

    addAdmin(form_data, token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const data = [
    { role: 'Admin', id: 1 },
    { role: 'Content Creator', id: 2 },
    { role: 'Content Approver', id: 3 },
    { role: 'Super Admin', id: 4 },
  ];
  const [user_roles, setUserRoles] = useState([]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  let roles = [];
  const handleMultiselect = (selectedList, selectedItem) => {
    const updatedRoles = [...user_roles, selectedItem.role];
    setUserRoles(updatedRoles);
  };

  const handleRemoval = (selectedList, removedItem) => {
    const updatedRole = user_roles.filter((role) => role !== removedItem.role);
    setUserRoles(updatedRole);
  };

  const handleFormChange = (e) => {
    switch (e.target.id) {
      case 'firstname':
        setFirstName(e.target.value);
        break;
      case 'lastname':
        setLastName(e.target.value);
        break;
      case 'phonenumber':
        setPhoneNumber(e.target.value);
      case 'email':
        setEmail(e.target.value);
      default:
        break;
    }
  };

  const [options] = useState(data);
  return (
    <div className="form">
      <h3>Add Admin</h3>
      <form className="form-container">
        <label>First Name</label>
        <input
          onChange={handleFormChange}
          id="firstname"
          type="text"
          placeholder="Enter admin first name"
          className="inputFields"
        />
        <label>Last Name</label>
        <input
          onChange={handleFormChange}
          id="lastname"
          type="text"
          placeholder="Enter admin last name"
          className="inputFields"
        />
        <label>Email</label>
        <input onChange={handleFormChange} id="email" type="text" placeholder="Enter admin email" className="inputFields" />
        <label>Phone Number</label>
        <input
          onChange={handleFormChange}
          id="phonenumber"
          type="text"
          placeholder="Enter admin number"
          className="inputFields"
        />
        <label>Role</label>
        <Multiselect onRemove={handleRemoval} onSelect={handleMultiselect} options={options} displayValue={'role'} />
        <button onClick={AddNewAdmin} className="btn btn-add-admin">
          Add Admin
        </button>
      </form>
    </div>
  );
};
