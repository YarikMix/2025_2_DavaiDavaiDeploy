import { Component } from 'ddd-react';
import { Context2 } from './Context2.ts';

type Props = {
	value: number
}

type State = {
	value: number
}

export class Context2Provider extends Component<Props, State>{
	state = {
		value: this.props.value
	}

	render() {
		return (
			<Context2.Provider
				value={{
					value: this.state.value,
				}}
		>
			{this.props.children}
			</Context2.Provider>
		);
	}
}
