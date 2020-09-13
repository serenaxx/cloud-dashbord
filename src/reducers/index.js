import { fromJS } from 'immutable'
import {
    // SET_PRODUCT_NAME,
    SET_PRODUCTS,
    SET_PRODUCT_VALUE,
} from '@src/actions/types'
import { defaultProducts } from '@src/cfgs/home';

const defaultState = fromJS({
    products: defaultProducts,
    // productName: 'project1',
    productValue: '1',
})

const Reducer = (state = defaultState, action) => {
  switch (action.type) {
    // case SET_PRODUCT_NAME:
    //   return setProductName(state, action)
    case SET_PRODUCT_VALUE:
      return setProductValue(state, action)
    case SET_PRODUCTS:
      return setProducts(state, action)
    default:
      return state
  }
}

// const setProductName = (state, { payload }) => {
//   const data = payload || ''
//   return state.setIn(['productName'], fromJS(data))
// }

const setProductValue = (state, { payload }) => {
  const data = payload || ''
  return state.setIn(['productValue'], fromJS(data))
}

const setProducts = (state, { payload }) => {
    const data = payload || []
    return state.setIn(['products'], fromJS(data))
  }

export default Reducer
