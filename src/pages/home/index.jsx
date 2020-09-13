import React, { useState, useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import qs from 'qs'
import RGL, { WidthProvider } from "react-grid-layout";
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom'
import _ from "lodash";
import { Tabs, Button, Card, Table, Descriptions, Input, Menu } from "antd";
import { changeProducts, saveProductWidget, saveProducts, changeProductValue } from "@src/actions/creators";
import { projectWidgets } from "@src/cfgs/home";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "@assets/css/home/index.less";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const { TabPane } = Tabs;
const ReactGridLayout = WidthProvider(RGL);

const generateLayout = (list) => {
  let w = 0
  return _.map(list, (item, i) => {
    w = w + item.w
    const cur = {
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      i: item.name
    }
    return cur;
  })
}

const Index = props => {
  const pProducts = useSelector(state => state.getIn(['products']).toJS())
  const pValue = useSelector(state => state.getIn(['productValue']))  

  const [curProducts, setCurProducts] = useState([...pProducts])
  const [curValue, setCurValue] = useState(pValue)
  
  const [isedit, setIsedit] = useState(false)
  const [projectName, setProjectName] = useState(curProducts.find(e => e.id === curValue).name)
  const [widgets, setWidgets] = useState([...projectWidgets[curValue].defaultWidgets])
  const [visibleWidgetKeys, setVisibleWidgetKeys] = useState([...projectWidgets[curValue].defaultWidgetKeys])

  const [tempProjectName, setTempProjectName] = useState(curProducts.find(e => e.id === curValue).name)
  const [tempWidgets, setTempWidgets] = useState([...projectWidgets[curValue].defaultWidgets])
  const [tempWidgetKeys, setTempWidgetKeys] = useState([...projectWidgets[curValue].defaultWidgetKeys])

  const dispatch = useDispatch()

  const formatData = (projectVal) => {
    const localWidgets = localStorage.getItem(projectVal)
    const localProducts = localStorage.getItem('products')
    
    if (!localWidgets && !projectWidgets[projectVal]) {
      props.history.push(`${window.location.pathname}`);
    } else {
      if (localProducts) {
        setCurProducts(JSON.parse(localProducts))
        const curName = JSON.parse(localProducts).find(e => e.id === projectVal).name
        setProjectName(curName)
        setTempProjectName(curName)
      }
      if (localWidgets) {
        const wgs = JSON.parse(localWidgets)
        setWidgets([...wgs.defaultWidgets])
        setTempWidgets([...wgs.defaultWidgets])
        setVisibleWidgetKeys([...wgs.defaultWidgetKeys])
        setTempWidgetKeys([...wgs.defaultWidgetKeys])
      }
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pid = params.get('product')
    if (pid) {
      setCurValue(pid)
    }
    const projectVal = pid ? pid : curValue
    formatData(projectVal)
  }, [pValue])

  // useEffect(() => {
  //   setCurValue(pValue)
  //   formatData(pValue)
  // }, [pValue])

  const generateCard = (item, index) => {
    return <Card
          key={item.name}
          title={item.alias ? item.alias : item.name}
          bordered={false}
          extra={<a href="#" onClick={(e) => deleteWidget(e, item.name)}>Delete</a>}
          >
          {projectWidgets[curValue].dataMap[item.name] && projectWidgets[curValue].dataMap[item.name].map((el, indx) => {
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
                        <Card className="mini">
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
                      {it.type && it.type === 'block' && (
                        <Button className="btn-block">{it.name}</Button>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
    </Card>
  }
  const edit = () => {
    setIsedit(true);
    setTempWidgetKeys([...visibleWidgetKeys])
    setTempWidgets([...widgets])
    setTempProjectName(projectName)
  };
  const deleteWidget = (event, name) => {
    event.stopPropagation();
    const newArr = visibleWidgetKeys.filter(e => e !== name);
    setVisibleWidgetKeys(newArr)
  }
  const onLayoutChange = (layout) => {
    setVisibleWidgetKeys(layout.map(el => el.i))
    const newWidgets = widgets.map(item => ({
      ...item,
      ...layout.find(el => el.i === item.name),
    }))
    setWidgets(newWidgets)
  }
  const onProjectNameChange = ({ target: { value } }) => {
    setProjectName(value);
  }

  const handleMenuClick = (data) => {
    const key = data.key
    if (!visibleWidgetKeys.includes(key)) {
      setVisibleWidgetKeys([...visibleWidgetKeys, key])
    }
  }
  const cancel = () => {
    setVisibleWidgetKeys([...tempWidgetKeys])
    setWidgets([...tempWidgets])
    setProjectName(tempProjectName)
    setIsedit(false);
  }
  const save = () => {
    saveProductWidget(curValue, JSON.stringify({
      defaultWidgets: widgets,
      dataMap: projectWidgets[curValue].dataMap,
      defaultWidgetKeys: visibleWidgetKeys,
    }))
    
    const newProducts = curProducts.map(item => {
      if (item.id === curValue) {
        item.name = projectName
      }
      return item
    })
    dispatch(changeProducts(newProducts))
    saveProducts('products', JSON.stringify(newProducts))
    setIsedit(false);
    props.history.push(`${window.location.pathname}?${qs.stringify({ product: curValue })}`);
  }
  const visibleWidgets = widgets.filter(item => visibleWidgetKeys.includes(item.name))
  const layout = generateLayout(visibleWidgets);

  return (
    <div className="page index">
      <section>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane
            tab={
              <div>
                {!isedit && <span>{projectName}</span>}
                {isedit && <Input placeholder="please input project name" value={projectName} onChange={onProjectNameChange} />}
              </div>
            }
            key="1"
          >
            {
              isedit && <><div style={{ width: '10%', background: "#fff" }}>
                <Button type="text" style={{ marginBottom: 16 }}>
                  select widgets
                </Button>
                <Menu
                  selectedKeys={[...visibleWidgetKeys]}
                  mode="inline"
                  inlineCollapsed={false}
                  onClick={handleMenuClick}
                >
                  {
                    widgets.map(item => ({
                      key: item.name,
                      name: item.alias,
                    })).map(conf => {
                      return <Menu.Item key={conf.key}>
                      {conf.name}
                    </Menu.Item>
                    })
                  }
                </Menu>
              </div>
                <div className="content" style={{ width: '90%' }}>
                <ReactGridLayout
                  className={`layout ${!isedit ? 'no-resizable' : ''}`}
                  rowHeight={100}
                  cols={12}
                  width={1200}
                  layout={layout}
                  isDraggable={isedit ? true : false}
                  isResizable={isedit ? true : false}
                  onLayoutChange={onLayoutChange}
                >
                  {visibleWidgets.map((item, index) => {
                    return generateCard(item, index)
                  })}
                </ReactGridLayout>
              </div></>
            }
            {
              !isedit && <div className="content" style={{ width: '100%' }}>
              <ReactGridLayout
                className={`layout ${!isedit ? 'no-resizable' : ''}`}
                rowHeight={100}
                cols={12}
                width={1200}
                layout={layout}
                isDraggable={isedit ? true : false}
                isResizable={isedit ? true : false}
                onLayoutChange={onLayoutChange}
              >
                {visibleWidgets.map((item, index) => {
                  return generateCard(item, index)
                })}
              </ReactGridLayout>
            </div>
            }
          </TabPane>
        </Tabs>
        <div className="btns">
          {
            !isedit && <Button
              type="primary"
              icon={<EditOutlined />}
              size="large"
              onClick={edit}
            >
              Custom view
            </Button>
          }
          {
            isedit && <>
              <Button className="btn-oper" type="primary" icon={<SaveOutlined />} onClick={save}>save</Button>
              <Button className="btn-oper" onClick={cancel}>cancel</Button>
            </>
          }
        </div>
      </section>
    </div>
  );
};

export default withRouter(Index);