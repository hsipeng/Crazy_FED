import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default function(key, actions){
    return connect((state)=>{
        return state[key]
    }, (dispatch) =>{
    return bindActionCreators(actions, dispatch)
    })
}