import {createReducer} from '../../../utils/createReducer'
import ACTION_HANLDERS from '../../actions/hello'
let initState ={
	content: {
		list:null,
		status:0
	}
}

export const key = 'hello'
export default createReducer(initState, ACTION_HANLDERS)
