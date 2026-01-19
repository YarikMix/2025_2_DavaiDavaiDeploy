import { Component } from '@/modules/react';

type State = {
	error?: Error;
	hasError: boolean;
	errorInfo?: any;
};

export class ErrorBoundary extends Component<{}, State> {
	state = { hasError: false };

	static getDerivedStateFromError(): Partial<State> {
		return { hasError: true };
	}

	didCatch(error: Error, errorInfo: any): void {
		this.setState({
			...this.state,
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			return <div />;
		}

		return this.props.children;
	}
}
