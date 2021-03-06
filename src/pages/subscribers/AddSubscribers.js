import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelBody, PanelFooter, PanelHeader } from '../../components/panel/panel';
import { Button, Input, FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import InputMask from 'react-input-mask';
import { postData } from '../../services/Utils/DB/DB';
import { store } from "react-notifications-component";

const data = [
  { role: 'subscriber', id: 1 },
  // { role: 'Content Approver', id: 3 },
  // { role: 'Super Admin', id: 4 },
];
export const AddSubscriber = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user_roles, setUserRoles] = useState([]);

  const onChangeFirstName = (e) => {
    const first = e.target.value;
    setFirstName(first);
  }
  const onChangeLastName = (e) => {
    const last = e.target.value;
    setLastName(last);
  }
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  }
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  }
  const handleMultiselect = (selectedList, selectedItem) => {
    const updatedRoles = [...user_roles, selectedItem.role];
    setUserRoles(updatedRoles);
  };

  const handleRemoval = (selectedList, removedItem) => {
    const updatedRole = user_roles.filter((role) => role !== removedItem.role);
    setUserRoles(updatedRole);
  };
  const AddNewSubscriber = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      roles: user_roles,
      email: email,
    }

    // const form_data = new FormData();
    // form_data.append('firstName', firstName);
    // form_data.append('lastName', lastName);
    // form_data.append('phoneNumber', phone);
    // form_data.append('role', user_roles);
    // form_data.append('email', email);

    postData('/subscribers', JSON.stringify(form_data), token)
      .then((response) => {
        // console.log(response);

        store.addNotification({
          title: "Success",
          message: "Added Subscriber Successfully",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "top-right", // where to position the notifications
          animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const [options] = useState(data);
  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/subscriber/view-subscribers">Subscribers</Link>
        </li>
        <li className="breadcrumb-item active">Add Subscriber</li>
      </ol>
      <h1 className="page-header">
        Add Subscribers <small>add a new subscriber here.</small>
      </h1>

      <Panel>
        <PanelHeader noButton={true}>Add Subscriber Form</PanelHeader>
        <PanelBody>
          <Row>
            <Col md={8}>
              <div className="card">
                <div className="card-body">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="first">First Name</Label>
                          <Input
                            type="text"
                            name="first"
                            id="first"
                            // placeholder="Product Name"
                            value={firstName}
                            onChange={onChangeFirstName}
                          // className={!isInvalidName ? "" : "is-invalid"}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="last">Last Name</Label>
                          <Input
                            type="text"
                            name="last"
                            id="last"
                            // placeholder="Product Name"
                            value={lastName}
                            onChange={onChangeLastName}
                          // className={!isInvalidName ? "" : "is-invalid"}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            // placeholder="Product Name"
                            value={email}
                            onChange={onChangeEmail}
                          // className={!isInvalidName ? "" : "is-invalid"}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="phone">Phone No.</Label>
                          <InputMask id="phone" mask="+\91 999 999 9999" maskChar="_" className="form-control" value={phone} onChange={onChangePhone}></InputMask>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="role">Subscriber Roles</Label>
                          <Multiselect id="role" onRemove={handleRemoval} onSelect={handleMultiselect} options={options} displayValue={'role'} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <div className="card-footer">
                  <Row>
                    <Col>
                      <div className="pull-right">
                        <button onClick={AddNewSubscriber} className="btn btn-primary mr-3">Submit</button>
                        <button onClick={AddNewSubscriber} className="btn btn-secondary">Cancel</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </PanelBody>
      </Panel>

    </div>
  );
};
