import { createContext } from 'ddd-react';

export interface Context2Value {
	value2: number
}

export const Context2 = createContext<Context2Value>({
	value2: 0,
});
