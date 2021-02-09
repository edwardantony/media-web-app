import React, { useState } from 'react';
import { Panel, PanelBody, PanelFooter, PanelHeader } from '../../components/panel/panel';
import { Button, Input, FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import InputMask from 'react-input-mask';
import { addSubscriber } from '../../services/Utils/DB/DB';

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
  const AddNewAdmin = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
    role: user_roles,
    email: email,
    }

    // const form_data = new FormData();
    // form_data.append('firstName', firstName);
    // form_data.append('lastName', lastName);
    // form_data.append('phoneNumber', phone);
    // form_data.append('role', user_roles);
    // form_data.append('email', email);

    console.log(form_data);
    addSubscriber(form_data, token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [options] = useState(data);
  return (
    <div style={{ width: "800px" }}>
      <Panel>
        <PanelHeader noButton={true}>Add Subscriber</PanelHeader>
        <PanelBody>
          <Form>
            <Row>
              <Col>
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
              <Col>
                <FormGroup>
                  <Label for="Last">Last Name</Label>
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
              <Col>
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
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="email">Phone No.</Label>
                  <InputMask mask="+\91 999 999 999" maskChar="_" className="form-control" value={phone} onChange={onChangePhone}></InputMask>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="email">Dropdown Role</Label>
                  <Multiselect onRemove={handleRemoval} onSelect={handleMultiselect} options={options} displayValue={'role'} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </PanelBody>
        <PanelFooter>
            <Row>
              <Col>
              <div className="pull-right">
                <button onClick={AddNewAdmin} className="btn btn-primary mr-3">Submit</button>
                <button onClick={AddNewAdmin} className="btn btn-secondary">Cancel</button>
              </div>
              </Col>
            </Row>
        </PanelFooter>
      </Panel>
    </div>
  );
};
