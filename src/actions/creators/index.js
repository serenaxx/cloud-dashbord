import {
  // SET_PRODUCT_NAME,
  SET_PRODUCTS,
  SET_PRODUCT_VALUE,
} from '@src/actions/types'

const _keyWithUid = (key) => {
  return key
}

// const changeProductName = (data) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       dispatch({
//         type: SET_PRODUCT_NAME,
//         payload: data,
//       })
//       resolve(data)
//     })
//   }
// }

const changeProductValue = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_PRODUCT_VALUE,
        payload: id,
      })
      resolve(id)
    })
  }
}

const changeProducts = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_PRODUCTS,
        payload: data,
      })
      resolve(data)
    })
  }
}

const saveProductWidget = (key, data) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(_keyWithUid(key), data)
      resolve(data)
    })
}

const saveProducts = (key, data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(key, data)
    resolve(data)
  })
}

export {
  // changeProductName,
  changeProductValue,
  changeProducts,
  saveProductWidget,
  saveProducts,
}