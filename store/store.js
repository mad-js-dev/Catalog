import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import productsList from './productsSlice'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  productsList
});

const confStore = () => {
  return configureStore({reducer: rootReducer}, applyMiddleware(thunk));
}
export default confStore;