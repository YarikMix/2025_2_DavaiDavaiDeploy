import type { ComponentType } from 'ddd-react';
import { Component } from 'ddd-react';
import { Context1, type Context1Value } from '@/modules/context1/Context1.ts';
import type { WithContext1Props } from '@/modules/context1/withContext1Props.ts';

type OmitContext1<T> = Omit<T, keyof WithContext1Props>;

export function withContext1<P>(WrappedComponent: ComponentType) {
	return class WithContext1 extends Component<OmitContext1<P>> {
		static readonly contextType = Context1;

		render() {
			return (
				<Context1.Consumer>
					{(context: Context1Value) => {
						return (
							<WrappedComponent {...(this.props as any)} context1={context} />
						);
					}}
				</Context1.Consumer>
			);
		}
	};
}
