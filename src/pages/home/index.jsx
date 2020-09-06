import React, { useState } from 'react'
import { Tabs, Button, Row, Col, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './index.less';
const { TabPane } = Tabs;


const list = [
    {
        name: 'billing_overview',
    },
    {
        name: 'resource_group',
    }
]

const dataMap = {
    billing_overview: [
        [
            {
                name: 'account_balance',
                value: 'CNY 0.00',
            },
            {
                name: 'available_quota',
                value: 'CNY 0.00',
            },
        ],[
            {
                name: 'coupon',
                value: '0',
                type: 'card',
            },
            {
                name: 'resource_pack',
                value: '0',
                type: 'card',
            }
        ]
    ],
    resource_group: [
        [
            {
                type: 'label',
                name: 'account name',
                value: 'serena.yun.com',
            }
        ],[
            {
                type: 'table',
                data: [],
            }
        ]
    ],
}

const Index = () => {
    const [isedit, setIsedit] = useState(false)

    const edit = () => {
        setIsedit(true)
    }

    return (
        <div className="page index">
            <section>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab={
                    <div>
                        <span>
                            project1
                        </span>
                        {isedit && <EditOutlined />}
                    </div>
                } key="1">
                    <div className="content">
                    {
                        list.map((item, index) => {
                            return (
                                <Card key={index} title={item.name} bordered={false}>
                                    {
                                        dataMap[item.name].map((el, indx) => {
                                            return (
                                                <div className="card-row" key={indx}>
                                                    {
                                                        el.map((it, ix) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        it.type && it.type === 'card' && <Card style={{ width: `${(1/el.length) * 100}%` }}>
                                                                            <h3>{it.name}</h3>
                                                                            <h2>{it.value}</h2>
                                                                        </Card>
                                                                    }
                                                                    {
                                                                        !it.type && <span key={ix} style={{width: `${(1/el.length) * 100}%`}}>
                                                                        <h3>{it.name}</h3>
                                                                        <h2>{it.value}</h2>
                                                                    </span>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </Card>
                            )
                        })
                    }
                    </div>
                </TabPane>
            </Tabs>
            <Button type="primary" icon={<EditOutlined />} size="large" onClick={edit}>
                Custom view
            </Button>
            </section>
        </div>
    )

}

export default Index