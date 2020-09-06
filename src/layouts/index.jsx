/**
 * 默认布局
 * 顶部导航
 */
import React from 'react';
import { Divider } from 'antd';
import Header from '@src/components/header';

const Layout = (props) => {
  const {
    children,
  } = props

  return (
    <>
      <Header/>
      <Divider />
      <main className="g-page">
        {children}
      </main>
    </>
  )
}

export default Layout
