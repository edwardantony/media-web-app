import React from 'react';

export const AddSubscriber = () => {

  const AddNewAdmin = (e)=>{
    e.preventDefault()
  }
  return (
    <div className="form">
      <h3>Add Subscriber</h3>
      <form className="form-container">
        <label>First Name</label>
        <input type="text" placeholder="Enter subscribers first name" className="inputFields" />
        <label>Email</label>
        <input type="email" placeholder="Enter subscribers email"/>
        <button onClick={AddNewAdmin} className="btn btn-add-admin">Add Subscribers</button>
      </form>
    </div>
  );
};
