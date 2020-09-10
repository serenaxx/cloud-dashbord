import React, { useState } from "react";
import { Tabs, Button, Row, Col, Card, Table, Descriptions } from "antd";
import Draggable from 'react-draggable';
import { EditOutlined } from "@ant-design/icons";
import "./index.less";
const { TabPane } = Tabs;

const list = [
  {
    name: "billing_overview",
    alias: "Billing Overview",
  },
  {
    name: "resource_group",
    alias: "Resource Group",
  },
  {
    name: "to_do_tasks",
    alias: "To Do Tasks",
  },
  {
    name: "resource_warning",
    alias: "Resource Warning",
  },
];

const dataMap = {
  billing_overview: [
    [
      {
        name: "Account Balance",
        value: "CNY 10.00",
      },
      {
        name: "Available Quota",
        value: "CNY 20.00",
      },
    ],
    [
      {
        name: "Coupon",
        value: "5",
        type: "card",
      },
      {
        name: "Resource Pack",
        value: "10",
        type: "card",
      },
    ],
  ],
  resource_group: [
    [
      {
        type: "description",
        data: [{
          name: "account number",
          value: "serena.cloud.com",
        }],
      },
    ],
    [
      {
        type: "table",
        data: [
          {
            key: '1',
            name: 'Website record',
            count: 3,
            status: 'available',
          },
          {
            key: '2',
            name: 'Cloud Function',
            count: 8,
            status: 'available',
          },
          {
            key: '3',
            name: 'resource name3',
            count: 0,
            status: '-',
          },
        ],
        columns: [
          {
            title: 'Resource Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Resource Count',
            dataIndex: 'count',
            key: 'count',
            render: text => text ? <a>{text}</a> : text,
          },
          {
            title: 'Resource Status',
            dataIndex: 'status',
            key: 'status',
          },
        ],
      },
    ],
  ],
  to_do_tasks: [
    [
      {
        name: "To Be Renewed",
        value: 1,
        type: "card",
      },
      {
        name: "To Be Paid",
        value: 0,
        type: "card",
      },
      {
        name: "To Do Ticket",
        value: 2,
        type: "card",
      },
    ],
  ],
  resource_warning: [
    [
      {
        name: "Safety Rating",
        value: "90/100",
        type: "card",
        plain: true,
      },
      {
        name: "Monitoring Alarm",
        value: 0,
        type: "card",
      },
      {
        name: "Loophole",
        value: 2,
        type: "card",
      },
    ],
  ],
};

const Index = () => {
  const [isedit, setIsedit] = useState(false);
  const [activeDrags, setActiveDrags] = useState(0)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0})
  const [controlledPosition, setControlledPosition] = useState({x: -400, y: 200})

  const edit = () => {
    setIsedit(true);
  };

  const handleStart = (e, data) => {
    const num = activeDrags + 1
    setActiveDrags(num)
  }
  const handleDrag = (e, ui) => {
    setDeltaPosition({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    })
  }
  const handleStop = () => {
    const num = activeDrags - 1
    setActiveDrags(num)
  }

  return (
    <div className="page index">
      <section>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane
            tab={
              <div>
                <span>project1</span>
                {isedit && <EditOutlined />}
              </div>
            }
            key="1"
          >
            <div className="content">
              {list.map((item, index) => {
                return (
                  <Draggable
                    key={index}
                    onStart={handleStart}
                    onDrag={handleDrag}
                    onStop={handleStop}
                    >
                    <Card key={index} title={item.alias ? item.alias : item.name} bordered={false}>
                    {dataMap[item.name] && dataMap[item.name].map((el, indx) => {
                      return (
                        <div className="card-row" key={indx}>
                          {el.map((it, ix) => {
                            return (
                              <div key={ix} className="card-item">
                                {!it.type && (
                                  <span
                                  >
                                    <h3>{it.name}</h3>
                                    <h2>{it.value}</h2>
                                  </span>
                                )}
                                {it.type && it.type === "card" && (
                                  <Card
                                  >
                                    <h3>{it.name}</h3>
                                    {
                                      it.value && !it.plain ? <a className="ft-sz-large">{it.value}</a> : <h2>{it.value}</h2>
                                    }
                                  </Card>
                                )}
                                {it.type && it.type === "description" && (
                                  <Descriptions>
                                  {
                                    it.data.map((e, x) => {
                                      return <Descriptions.Item label={e.name} key={x}>{e.value}</Descriptions.Item>
                                    })
                                  }
                                </Descriptions>
                                )}
                                {it.type && it.type === "table" && (
                                  <Table columns={it.columns} dataSource={it.data} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    </Card>
                  </Draggable>
                )
              })}
            </div>
          </TabPane>
        </Tabs>
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="large"
          onClick={edit}
        >
          Custom view
        </Button>
      </section>
    </div>
  );
};

export default Index;