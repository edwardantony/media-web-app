import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelBody, PanelFooter, PanelHeader } from '../../components/panel/panel';
import { Button, Input, FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import InputMask from 'react-input-mask';
// import { addSubscriber } from '../../services/Utils/DB/DB';
import FileUploader from "react-firebase-file-uploader";
import { fireDb } from '../../services/firebase';

const data = [
    { role: 'subscriber', id: 1 },
    // { role: 'Content Approver', id: 3 },
    // { role: 'Super Admin', id: 4 },
];
export const AddSingleVideo = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [user_roles, setUserRoles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");

    const onChangeTitle = (e) => {
        const first = e.target.value;
        setTitle(first);
    }
    const onChangeCategory = (e) => {
        const last = e.target.value;
        setCategory(last);
    }
    const onChangeGenre = (e) => {
        const genre = e.target.value;
        setGenre(genre);
    }
    const onChangeSynopsis = (e) => {
        const synopsis = e.target.value;
        setSynopsis(synopsis);
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
            title: title,
            category: category,
            synopsis: synopsis,
            roles: user_roles,
            genre: genre,
        }

        // const form_data = new FormData();
        // form_data.append('firstName', firstName);
        // form_data.append('lastName', lastName);
        // form_data.append('phoneNumber', phone);
        // form_data.append('role', user_roles);
        // form_data.append('email', email);

        console.log(form_data);
        // addSubscriber(JSON.stringify(form_data), token)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    const handleUploadStart = () => {
        setIsUploading(true);
        setProgress(0);
    };
    const handleProgress = progress => setProgress(progress);
    const handleUploadError = error => {
        setIsUploading(false)
        console.error(error);
    };
    const handleUploadSuccess = filename => {
        setImageURL(filename);
        setProgress(100);
        setIsUploading(false);
        fireDb
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => setImageURL(url));
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
                Add Single Video <small>add a new single video here.</small>
            </h1>

            <Panel>
                <PanelHeader noButton={true}>Add Single Video</PanelHeader>
                <PanelBody>
                    {/* <Row>
                        <Col md="8"> */}
                    <div className="card">
                        <div className="card-body">
                            {/* <Form> */}
                            <Row>
                                <Col md={7}>
                                    <Row>
                                        <Col>
                                            <h4>Basic Information</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="title">Title</Label>
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    // placeholder="Product Name"
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
                                                <Label for="category">Language</Label>
                                                <Input
                                                    type="select"
                                                    name="category"
                                                    id="category"
                                                    // placeholder="Product Name"
                                                    value={category}
                                                    onChange={onChangeCategory}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="genre">Maturity Rating</Label>
                                                <Input
                                                    type="select"
                                                    name="genre"
                                                    id="genre"
                                                    // placeholder="Product Name"
                                                    value={genre}
                                                    onChange={onChangeGenre}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input
                                                    type="select"
                                                    name="category"
                                                    id="category"
                                                    // placeholder="Product Name"
                                                    value={category}
                                                    onChange={onChangeCategory}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="genre">Genre</Label>
                                                <Input
                                                    type="select"
                                                    name="genre"
                                                    id="genre"
                                                    // placeholder="Product Name"
                                                    value={genre}
                                                    onChange={onChangeGenre}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="category">Releasing Date</Label>
                                                <Input
                                                    type="date"
                                                    name="category"
                                                    id="category"
                                                    // placeholder="Product Name"
                                                    value={category}
                                                    onChange={onChangeCategory}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="genre">Expiry Date</Label>
                                                <Input
                                                    type="date"
                                                    name="genre"
                                                    id="genre"
                                                    // placeholder="Product Name"
                                                    value={genre}
                                                    onChange={onChangeGenre}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="synopsis">Synopsis</Label>
                                                <Input
                                                    type="textarea"
                                                    name="synopsis"
                                                    id="synopsis"
                                                    rows="5"
                                                    // placeholder="Product Name"
                                                    value={synopsis}
                                                    onChange={onChangeSynopsis}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row>
                                        <Col>
                                            <h4>Upload Video</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="synopsis">video</Label>
                                                {isUploading && <p>Progress: {progress}</p>}
                                                {imageURL && <img src={imageURL} />}
                                                <FileUploader
                                                    accept="image/*"
                                                    name="image"
                                                    randomizeFilename
                                                    storageRef={fireDb.storage().ref("images")}
                                                    onUploadStart={handleUploadStart}
                                                    onUploadError={handleUploadError}
                                                    onUploadSuccess={handleUploadSuccess}
                                                    onProgress={handleProgress}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* </Form> */}
                        </div>
                        <div className="card-footer">
                            <Row>
                                <Col>
                                    <div className="pull-right">
                                        <button onClick={AddNewSubscriber} className="btn btn-primary mr-3">Add</button>
                                        <button onClick={AddNewSubscriber} className="btn btn-secondary">Cancel</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* </Col>
                    </Row> */}
                </PanelBody>
            </Panel>

        </div>
    );
};
