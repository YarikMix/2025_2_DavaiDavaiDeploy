import 'reset-css/reset.css';

import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Component, render } from 'ddd-react';
import { Context1Provider } from '@/modules/context1/Context1Provider.tsx';
import { withContext1 } from '@/modules/context1/withContext1.tsx';
import type { WithContext1Props } from '@/modules/context1/withContext1Props.ts';
import { Context2Provider } from '@/modules/context2/Context2Provider.tsx';


class TestComponent extends Component<WithContext1Props> {
	render() {
		return (
			<div class="layout">
				<button onClick={this.props.context1.increment} style={{width: "100px"}}>Increment</button>
				<h3>{this.props.context1.value}</h3>
			</div>
		);
	}
}

const Test = withContext1(TestComponent);

class App extends Component {
	render() {
		return (
			<Context1Provider value={10}>
				<Context2Provider value={10}>
					<Test />
				</Context2Provider>
			</Context1Provider>
		);
	}
}

render(
	<App />,
	document.body,
);
