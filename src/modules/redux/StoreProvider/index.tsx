import { Component } from 'ddd-react';
import { StoreContext } from '../connect';
import type { Store } from '../types/store';

interface StoreProviderProps {
	store: Store;
}

export class StoreProvider extends Component<StoreProviderProps> {
	render() {
		return (
			<StoreContext.Provider value={this.props.store}>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}
