import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import register from './register'
import home from './home'
import personal from './personal'

const rootReducer = combineReducers({
    form: formReducer,
    routerReducer,
    register,
    home,
    personal,
});

export default rootReducer;