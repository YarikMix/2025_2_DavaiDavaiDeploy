import { Component } from 'ddd-react';
import { Context1 } from './Context1';

type Props = {
	value: number
}

type State = {
	value: number
}

export class Context1Provider extends Component<Props, State>{
	state = {
		value: this.props.value
	}

	increment = () => {
		this.setState({value: this.state.value + 1})
	}

	render() {
		return (
			<Context1.Provider
				value={{
					value: this.state.value,
					increment: this.increment
				}}
		>
			{this.props.children}
			</Context1.Provider>
		);
	}
}
