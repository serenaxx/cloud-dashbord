import React, { useState, useEffect } from 'react'
import {
    useSelector,
    useDispatch,
  } from 'react-redux'
import {
    withRouter,
} from 'react-router-dom'
import { Row, Col, Select } from 'antd';
import qs from 'qs'
import { changeProductValue } from "@src/actions/creators"
const { Option } = Select;


const Header = props => {
    const products = useSelector(state => state.getIn(['products']).toJS())
    const pValue = useSelector(state => state.getIn(['productValue']))

    const [curProducts, setCurProducts] = useState([...products])
    const [curValue, setCurValue] = useState(pValue)
    
    const dispatch = useDispatch()

    useEffect(() => {
        const localProducts = localStorage.getItem('products')
        if (localProducts) {
            setCurProducts(JSON.parse(localProducts))
        }
        const params = new URLSearchParams(window.location.search)
        const id = params.get('product')
        const projectVal = id ? id : pValue
        setCurValue(projectVal)
    }, [JSON.stringify(products)])

    const handleChange =(value) => {
        setCurValue(value)
        const search = qs.stringify({
            product: value,
        })
        dispatch(changeProductValue(value))
        window.location.href = `${window.location.pathname}?${search}`
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
                            <Select value={curValue} style={{ width: 200 }} onChange={handleChange}>
                                {curProducts.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.name}</Option>
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

export default withRouter(Header)