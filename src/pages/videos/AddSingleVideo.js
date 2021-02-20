import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelBody, PanelFooter, PanelHeader } from '../../components/panel/panel';
import { Button, Input, FormGroup, Label, Form, Row, Col, CustomInput } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import InputMask from 'react-input-mask';
// import { addSubscriber } from '../../services/Utils/DB/DB';
import FileUploader from "react-firebase-file-uploader";
import { fireDb, storage } from '../../services/firebase';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getData, postData } from '../../services/Utils/DB/DB';
import DynamicInputs from '../../components/dynamicInputs/DynamicInputs';

export const AddSingleVideo = () => {
    const [genreList, setGenreList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("New Arrivals");
    const [genre, setGenre] = useState("Genral");
    const [language, setLanguage] = useState("Malayalam");
    const [maturity, setMaturity] = useState("Every One");
    const [synopsis, setSynopsis] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [castCrewData, setCastCrewData] = useState([]);
    let fileUploaderRef = useRef();

    const utoken = localStorage.getItem('utoken') || '';
    useEffect(() => {
        getData('/genres', utoken)
            .then((data) => {
                if (data) {
                    setGenreList(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        getData('/categories', utoken)
            .then((data) => {
                if (data) {
                    setCategoryList(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        getData('/languages', utoken)
            .then((data) => {
                if (data) {
                    setLanguageList(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    //video upload
    const [fileName, setFileName] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const [imgVideoFile, setImgVideoFile] = useState("");
    const [invalidFile, setInvalidFile] = useState(false);
    const handleFileChange = ({ target: { files } }) => {
        let file = files[0];
        let reader = new FileReader();
        // reader.readAsDataURL(file);
        reader.readAsArrayBuffer(file);
        const cancel = !files.length;
        if (cancel) return;

        setVideoFile(files[0])
        const [{ size, name }] = files;
        // const maxSize = 50000;
        reader.onload = () => {
            var blob = new Blob([reader.result], { type: file.type });
            var url = URL.createObjectURL(blob);
            var video = document.createElement('video');
            var timeupdate = function () {
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                    video.pause();
                }
            };
            video.addEventListener('loadeddata', function () {
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                }
            });
            var snapImage = function () {
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                var image = canvas.toDataURL();
                var success = image.length > 100000;
                if (success) {
                    setImgVideoFile(image);
                    URL.revokeObjectURL(url);
                }
                return success;
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.play();
        }
        // if (size < maxSize) {
        setFileName(name);
        setInvalidFile(false);
    }
    //image file upload
    const [imgPortraitName, setImgPortraitName] = useState("");
    const [imgPortraitFile, setImgPortraitFile] = useState(null);
    const [portraitFile, setPortraitFile] = useState(null);
    const [invalidImgPortrait, setInvalidImgPortrait] = useState(false);
    const handlePortraitChange = ({ target: { files } }) => {
        console.log(files);
        const cancel = !files.length;
        if (cancel) return;

        setImgPortraitFile(URL.createObjectURL(files[0]));
        setPortraitFile(files[0]);
        const [{ size, name }] = files;
        setImgPortraitName(name);
        setInvalidImgPortrait(false);
    }
    //image file upload
    const [imgLandscapeName, setImgLandscapeName] = useState("");
    const [imgLandscapeFile, setImgLandscapeFile] = useState(null);
    const [landscapeFile, setLandscapeFile] = useState(null);
    const [invalidImgLandscape, setInvalidImgLandscape] = useState(false);
    const handleLandscapeChange = ({ target: { files } }) => {
        const cancel = !files.length;
        if (cancel) return;

        setImgLandscapeFile(URL.createObjectURL(files[0]));
        setLandscapeFile(files[0]);
        const [{ size, name }] = files;
        setImgLandscapeName(name);
        setInvalidImgLandscape(false);
    }
    // const [landImage, setLandImage] = useState(null);
    // const customOnChangeHandler = (event) => {
    //     const { target: { files } } = event;
    //     setImgLandscapeFile(URL.createObjectURL(files[0]));
    //     console.log(files);
    //     const filesToStore = [];

    //     // files.forEach(file => filesToStore.push(file));
    //     setLandImage(files);
    // }

    // /**
    // * Start download handler using the file uploader reference
    // */
    // const startUploadManually = () => {
    //     // landImage.forEach(file => {
    //     fileUploaderRef.startUpload(landImage)
    //     // });
    // }

    //cast & crew
    const getValue = (data) => {
        setCastCrewData(data);
    }

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
    const onChangeLanguage = (e) => {
        const language = e.target.value;
        setLanguage(language);
    }
    const onChangeMaturity = (e) => {
        const maturity = e.target.value;
        setMaturity(maturity);
    }
    const onChangeSynopsis = (e) => {
        const synopsis = e.target.value;
        setSynopsis(synopsis);
    }

    const onChangeExpiryDate = (date) => {
        setExpiryDate(date);
    };
    // const onChangeReleaseDate = (date) => {
    //     setReleaseDate(date);
    // };
    const onChangeReleaseDate = (e) => {
        const releaseDate = e.target.value;
        setReleaseDate(releaseDate);
    };

    const AddNewSingleVideo = (e) => {
        e.preventDefault();
        // startUploadManually();

        const token = localStorage.getItem('utoken');
        const images = [];
        if (imgLandscapeFile) {
            console.log(landscapeFile);
            images.push({
                imageExt: landscapeFile.type,
                imageType: "landscape"
            });
            handleFireBaseUpload(landscapeFile, "images/landscape");
        }
        if (imgPortraitFile) {
            images.push({
                imageExt: portraitFile.type,
                imageType: "portrait"
            });
            handleFireBaseUpload(portraitFile, "images/portrait");
        }
        const form_data = {
            title: title,
            category: category,
            language: language,
            synopsis: synopsis,
            videoExt: videoFile.type,
            // expiry_date: expiryDate,
            releaseDate: releaseDate,
            genre: genre,
            castCrew: castCrewData,
            images: images,
            maturityRating: maturity,
            activeImage: "landscape",
            paymentType: "free",
        }

        // const form_data = new FormData();
        // form_data.append('firstName', firstName);
        // form_data.append('lastName', lastName);
        // form_data.append('phoneNumber', phone);
        // form_data.append('email', email);

        console.log(form_data);
        postData('/singles', JSON.stringify(form_data), token)
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => {
                // console.log(error);
            });
        if (videoFile)
            handleFireBaseUpload(videoFile, "videos/original");
    };
    const handleFireBaseUpload = (file, type) => {
        console.log('start of upload')
        // async magic goes here...
        if (file === '') {
            console.error(`not an image, the image file is a ${typeof (file)}`)
        }
        const uploadTask = storage.ref(`/${type}/${file.name}`).put(file)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref(`${type}`).child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        // setIm ageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                    })
            })
    }
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
                    <div className="card">
                        <div className="card-body">
                            <Row>
                                <Col md={7}>
                                    <Row>
                                        <Col>
                                            <h4>Basic Information</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
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
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input
                                                    type="select"
                                                    name="category"
                                                    id="category"
                                                    value={category}
                                                    onChange={onChangeCategory}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                >
                                                    {categoryList.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.category}>{item.category}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="genre">Genre</Label>
                                                <Input
                                                    type="select"
                                                    name="genre"
                                                    id="genre"
                                                    value={genre}
                                                    onChange={onChangeGenre}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                >
                                                    {genreList.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.genre}>{item.genre}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="language">Language</Label>
                                                <Input
                                                    type="select"
                                                    name="language"
                                                    id="language"
                                                    value={language}
                                                    onChange={onChangeLanguage}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                >
                                                    {languageList.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.lang}>{item.lang}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="maturity">Maturity Rating</Label>
                                                <Input
                                                    type="select"
                                                    name="maturity"
                                                    id="maturity"
                                                    value={maturity}
                                                    onChange={onChangeMaturity}
                                                // className={!isInvalidName ? "" : "is-invalid"}
                                                >
                                                    <option value="Everyone">Everyone</option>
                                                    <option value="10+"> 10+ </option>
                                                    <option value="Teen"> Teen</option>
                                                    <option value="17+"> 17+</option>
                                                    <option value="18+"> 18+</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="releaseDate">Releasing Date</Label>
                                                <Input
                                                    type="date"
                                                    name="maturity"
                                                    id="maturity"
                                                    value={releaseDate}
                                                    onChange={onChangeReleaseDate}
                                                />
                                                {/* <DatePicker selected={releaseDate} onChange={onChangeReleaseDate} className="form-control"/> */}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="synopsis">Synopsis</Label>
                                                <Input
                                                    type="textarea"
                                                    name="synopsis"
                                                    id="synopsis"
                                                    rows="5"
                                                    value={synopsis}
                                                    onChange={onChangeSynopsis}
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
                                        <Col className="p-2">
                                            <label>Select Video</label>
                                            <div className="file-upload video-upload">
                                                <input
                                                    type="file"
                                                    id="videoFileBrowser"
                                                    name="videoFile"
                                                    onChange={handleFileChange}
                                                    accept="video/mp4" />
                                                {!imgVideoFile ?
                                                    <div className="text-center">
                                                        <i className="fa fa-video"></i>
                                                        <p>Upload Video.</p>
                                                    </div>
                                                    :
                                                    <div className="m-auto" style={{ height: "100%", width: "100%" }}>
                                                        <img src={imgVideoFile} style={{ height: "100%", width: "auto" }} />
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="row">
                                        <Col md={4} className="p-2">
                                            <label>Select Thumbnail</label>
                                            <div className="file-upload image-upload">
                                                <input
                                                    type="file"
                                                    id="portraitBrowser"
                                                    name="portraitFile"
                                                    onChange={handlePortraitChange}
                                                    accept="image/gif, image/jpeg" />
                                                {!imgPortraitFile ?
                                                    <div className="text-center">
                                                        <i className="fa fa-camera"></i>
                                                        <p>Upload Portriat</p>
                                                    </div>
                                                    :
                                                    <div className="m-auto" style={{ height: "100%", width: "100%" }}>
                                                        <img src={imgPortraitFile} style={{ height: "100%", width: "100%" }} />
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={8} className="p-2">
                                            <label>Select Story Art</label>
                                            <div className="file-upload image-upload">
                                                {/* <FileUploader
                                            //     storageRef={storage.ref("images")}
                                            //     onChange={customOnChangeHandler} // ⇐ Call your handler
                                            //     ref={instance => { fileUploaderRef = instance; } }  // ⇐ reference the component
                                            // />*/}
                                                <input
                                                    type="file"
                                                    id="landscapeBrowser"
                                                    name="landscapeFile"
                                                    onChange={handleLandscapeChange}
                                                    accept="image/gif, image/jpeg" />
                                                {!imgLandscapeFile ?
                                                    <div className="text-center">
                                                        <i className="fa fa-camera"></i>
                                                        <p>Upload Landscape</p>
                                                    </div>
                                                    :
                                                    <div className="m-auto" style={{ height: "100%", width: "100%" }}>
                                                        <img src={imgLandscapeFile} style={{ height: "100%", width: "100%" }} />
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* </div> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <DynamicInputs getValue={getValue} />
                                </Col>
                            </Row>
                        </div>
                        <div className="card-footer">
                            <Row>
                                <Col>
                                    <div className="pull-right">
                                        <button onClick={AddNewSingleVideo} className="btn btn-primary mr-3">Add</button>
                                        {/* <button onClick={AddNewSingleVideo} className="btn btn-secondary">Cancel</button> */}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </PanelBody>
            </Panel>

        </div>
    );
};
