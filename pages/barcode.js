import React, { useRef, useEffect, useState } from 'react'
import {
    Form, Button, Container, Row, Col, Card, TabContent,
    Input,
    FormGroup,
    Label,
    Alert,
    Badge, CardHeader, CardBody
} from "reactstrap";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Barcode from 'react-barcode';
// import { ErrorBoundary } from "react-error-boundary";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { PopoverPicker } from "components/Barkode/PopoverPicker";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

function barcode() {
    const [script, setScript] = useState(`https://barkode.com/businessCode?data=12345`);
    const [textValue, setTextValue] = useState("Sample Code ABC")
    const [type, setType] = useState("CODE128")
    const [width, setWidth] = useState(2)
    const [height, setHeight] = useState(100)
    const [bGColor, setBGcolor] = useState("#FFFFFF");
    const [lineColor, setLineColor] = useState("#000000");
    const [showText, setShowText] = useState(true);

    const Handle = Slider.Handle;
    // function fallbackRender({ error, resetErrorBoundary }) {
    //     resetErrorBoundary
    //     return (
    //         <div role="alert" className='text-center'>
    //             <pre style={{ color: "red" }}>{error}</pre>
    //         </div>
    //     );
    // }
    useEffect(() => {

        const variables = `${type === "CODE128" ? "" : `&type=${type}`}${width === 2 ? "" : `&width=${width}`}${height === 100 ? "" : `&height=${height}`}${bGColor === "#FFFFFF" ? "" : `&bGColor=${bGColor}`}${lineColor === "#000000" ? "" : `&lineColor=${lineColor}`}${showText ? "" : `&displayValue=false`}`
        setScript(`https://barkode.com/businessCode?data={{person.fieldName}}${variables}`)
    }, [type, width, height, bGColor, lineColor, showText])

    const handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    return (
        <Container className='text-center'>
            <div className='pt-5'>
                <Card >
                    <CardHeader>
                        <h3> Barkode Generator</h3>
                    </CardHeader>
                    <CardBody>
                        <Alert>
                            <code>{script}</code>
                            <div className='text-right'>
                                <CopyToClipboard text={script}>
                                    <Button>Copy Code</Button>
                                </CopyToClipboard>
                            </div>
                        </Alert>
                        {/* <ErrorBoundary fallbackRender={fallbackRender}
                            resetKeys={[textValue]}> */}
                        <Barcode value={textValue} format={type} width={width} height={height} background={bGColor} lineColor={lineColor} displayValue={showText} />
                        {/* </ErrorBoundary> */}

                        <Row className='pt-3'>
                            <Col xs='2' className='offset-md-2'>
                                <Label for="text" className='pt-2'>
                                    Sample Text
                                </Label>
                            </Col>
                            <Col xs='6'>
                                <Input placeholder="Enter Preview Text Here" id='text' className='w-100' onChange={(e) => { setTextValue(e.target.value) }}></Input>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col xs='2' className='offset-md-2'>
                                <Label for="exampleSelect" className='pt-2'>
                                    Barcode Type
                                </Label>
                            </Col>
                            <Col xs='6'>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={(e) => { setType(e.target.value) }}
                                >
                                    <option value="CODE128">CODE128</option>
                                    <option value="CODE128A">CODE128 A</option>
                                    <option value="CODE128B">CODE128 B</option>
                                    <option value="CODE128C">CODE128 C</option>
                                    <option value="EAN13">EAN13</option>
                                    <option value="EAN8">EAN8</option>
                                    <option value="UPC">UPC</option>
                                    <option value="CODE39">CODE39</option>
                                    <option value="ITF14">ITF14</option>
                                    <option value="ITF">ITF</option>
                                    <option value="MSI">MSI</option>
                                    <option value="MSI10">MSI10</option>
                                    <option value="MSI11">MSI11</option>
                                    <option value="MSI1010">MSI1010</option>
                                    <option value="MSI1110">MSI1110</option>
                                    <option value="pharmacode">Pharmacode</option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className='pt-4'>
                            <Col xs='2' className='offset-md-2'>
                                <Label>
                                    Width:
                                </Label>
                            </Col>
                            <Col xs='6'>
                                <Slider min={1} max={4} defaultValue={width} handle={handle} onChange={(value) => setWidth(value)} /> {width}
                            </Col>
                        </Row>
                        <Row className='pt-3'>
                            <Col xs='2' className='offset-md-2'>
                                <Label>
                                    Height:
                                </Label>
                            </Col>
                            <Col xs='6'>
                                <Slider min={1} max={150} defaultValue={height} handle={handle} onChange={(value) => setHeight(value)} /> {height}
                            </Col>
                        </Row>
                        <Row className='pt-4'>
                            <Col xs='3' className='offset-md-3' >
                                <Row>
                                    <div className="form-check form-switch">
                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={showText} onChange={() => setShowText(!showText)} />
                                        <Label className="form-check-label" for="flexSwitchCheckChecked">Show Coupon Code</Label>
                                    </div>
                                </Row>
                            </Col>
                            <Col xs='3'  >
                                <Row>
                                    <Label className='pr-3'>Background Color: </Label>
                                    <PopoverPicker color={bGColor} onChange={setBGcolor} />
                                </Row>
                            </Col>
                            <Col xs='3'  >
                                <Row>
                                    <Label className='pr-3'>Line Color: </Label>
                                    <PopoverPicker color={lineColor} onChange={setLineColor} />
                                </Row>
                            </Col>

                        </Row>

                    </CardBody>
                </Card>
            </div>
        </Container >
    )
}

export default barcode