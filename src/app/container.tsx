import React, { PropsWithChildren, useContext } from 'react'
import { GlobalStatus } from './shared/types'
import { StoreType, PureAction } from './shared/container'
import { Container } from './components/base'

const GlobalContext = React.createContext<StoreType<GlobalStatus>>({
	state: { title: 'Git-Search' },
	dispatch: () => { }
})

const GLOBAL_ACTION_SET_TITLE = 'ACTION_SET_TITLE'
const globalReducer = (state: GlobalStatus, action: PureAction): GlobalStatus => {
	switch (action.type) {
		case GLOBAL_ACTION_SET_TITLE:
			return { title: action.payload }
		default:
			return state
	}
}

export const setTitle = (title: string) => ({
	type: GLOBAL_ACTION_SET_TITLE,
	payload: title
})

export const useDispatch = () => {
	const { dispatch } = useContext(GlobalContext)
	return dispatch
}

export const useTitle = () => {
	const { state } = useContext(GlobalContext)
	return state.title
}


export const GlobalContainer: React.FC<PropsWithChildren<{}>> = (props) => (
	<Container<GlobalStatus>
		initial={{ title: 'Git-Search' }}
		reducer={globalReducer}
		context={GlobalContext}
	>
		{props.children}
	</Container>
)
