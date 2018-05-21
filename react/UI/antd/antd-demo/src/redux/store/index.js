import createStore from './createStore';
import reducer, { key } from '../reducers/home';

const store = createStore({}, {
[key]: reducer
});


export default store;
