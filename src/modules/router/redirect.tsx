import { Component } from 'ddd-react';
import type { WithRouterProps } from './types/withRouterProps';
import { withRouter } from './withRouter';

interface RedirectProps {
	to: string;
}

class RedirectComponent extends Component<WithRouterProps & RedirectProps> {
	didMount() {
		this.props.router.navigate(this.props.to);
	}

	render() {
		return <></>;
	}
}

export const Redirect = withRouter(RedirectComponent);
