import { createContext } from 'ddd-react';

export interface Context1Value {
	value: number,
	increment: VoidFunction;
}

export const Context1 = createContext<Context1Value>({
	value: 0,
	increment: () => {}
});
