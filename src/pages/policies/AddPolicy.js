import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelBody, PanelFooter, PanelHeader} from '../../components/panel/panel';
import { Button, Input, FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { postData } from '../../services/Utils/DB/DB';

export const AddPolicy = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  }
  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  }
  
  const AddNewPolicy = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = {
    title: title,
    content: content
    }

    postData('/policies',JSON.stringify(form_data), token)
      .then((response) => {
       // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/page/view-policies">Policies</Link>
        </li>
        <li className="breadcrumb-item active">Add Policy</li>
      </ol>
      <h1 className="page-header">
        Add Policy <small>add a new policy here.</small>
      </h1>
      
      <Panel>
        <PanelHeader noButton={true}>Add Policy Form</PanelHeader>
        <PanelBody>
                <Row>
                   <Col md ="12">
                   <div class="card">
                     <div class="card-body">
                     <Form>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                              type="text"
                              name="title"
                              id="title"
                              // placeholder="Title"
                              value={title}
                              onChange={onChangeTitle}
                            // className={!isInvalidName ? "" : "is-invalid"}
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                          <FormGroup>
                            <Label for="content">Description</Label>
                            <Input
                              type="textarea"
                              name="content"
                              id="content"
                              rows='10'
                              // placeholder="Product Name"
                              value={content}
                              onChange={onChangeContent}
                            // className={!isInvalidName ? "" : "is-invalid"}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                     </div>
                     <div class="card-footer">
                     <Row>
                      <Col>
                      <div className="pull-right">
                        <button onClick={AddNewPolicy} className="btn btn-primary mr-3">Submit</button>
                        <button onClick={AddNewPolicy} className="btn btn-secondary">Cancel</button>
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



