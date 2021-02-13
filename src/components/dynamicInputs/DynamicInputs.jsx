import React, { useState, useEffect } from "react";
import { Input, Row, Col } from 'reactstrap';

const titleList = [
    { title: "Director" },
    { title: "Producer" },
    { title: "Actor" },
    { title: "Editor" },
]
function DynamicInputs(props) {
    const [inputList, setInputList] = useState([{ title: "Director", name: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { title: "Director", name: "" }]);
    };

    useEffect(() => {
        props.getValue(JSON.stringify(inputList));
        return () => {
            // cleanup
        }
    }, [inputList])
    const getValue = () => {
        return JSON.stringify(inputList);
    }

    return (
        <div>
            <Row>
                <Col md={4}>
                    <h6>Title</h6>
                </Col>
                <Col md={4}>
                    <h6>Name</h6>
                </Col>
                <Col md={4}></Col>
            </Row>
            {inputList.map((x, i) => {
                return (
                    <Row key={i} className="mb-1">
                        <Col md={4}>
                            <Input
                                type="select"
                                name="title"
                                value={x.title}
                                onChange={e => handleInputChange(e, i)}
                            >
                                {
                                    titleList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.title}>{item.title}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        <Col md={4}>
                            <Input
                                type="text"
                                name="name"
                                value={x.name}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Col>
                        <Col md={4}>
                            <div className="btn-box">
                                {inputList.length !== 1 && <button
                                    className="mr-2 btn btn-danger"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {inputList.length - 1 === i && <button className="btn btn-primary" onClick={handleAddClick}>Add</button>}
                            </div>
                        </Col>
                    </Row>
                );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        </div>
    );
}

export default DynamicInputs;
