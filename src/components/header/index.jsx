import React, { useState } from 'react'
import { Row, Col, Select } from 'antd';
const { Option } = Select;


const list = [
    {
        name: 'project1',
    },
    {
        name: "project2",
    }
]

const Header = props => {
    const [projectVal, setProjectVal] = useState(0)

    const handleChange =(value) => {
        setProjectVal(value)
    }

    return (
        <header className="g-header">
            <Row className="pd-tp-dft">
                <Col span={6}>
                    <h2 className="clr-gray-1">cloud console</h2>
                </Col>
                <Col span={18}>
                    <Row>
                        <Col span={18} push={6}>
                            <Select defaultValue={projectVal} style={{ width: 120 }} onChange={handleChange}>
                                {list.map((item, index) => {
                                    return (
                                        <Option key={index} value={index}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col span={6} pull={2}>
                            <h3>hi, serena</h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </header>
    )
}

export default Header