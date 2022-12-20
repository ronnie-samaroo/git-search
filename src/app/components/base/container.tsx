import React, { Reducer } from 'react'
import { PureAction, StoreType } from 'app/shared/container/context'
import { useReducerWithMiddleware, functionMiddleWare } from 'app/shared/container/middleware'

const middlewares = [functionMiddleWare]
type ContainerProps<S> = {
	initial: S;
	reducer: Reducer<S, PureAction>;
	context: React.Context<StoreType<S>>;
	children: React.ReactNode;
}
export function Container<S>(props: ContainerProps<S>) {
	const { initial, reducer, children, context } = props
	const {state, dispatch} = useReducerWithMiddleware(reducer, initial, middlewares);

	return (
		<context.Provider value={{ state, dispatch }}>
			{children}
		</context.Provider>
	)
}
