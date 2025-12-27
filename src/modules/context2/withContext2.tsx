import type { ComponentType } from 'ddd-react';
import { Component } from 'ddd-react';
import { type Context1Value } from '@/modules/context1/Context1.ts';
import { Context2 } from '@/modules/context2/Context2.ts';
import type { WithContext2Props } from '@/modules/context2/withContext2Props.ts';

type OmitAdaptivity<T> = Omit<T, keyof WithContext2Props>;

export function withContext2<P>(
	WrappedComponent: ComponentType<P & WithContext2Props>,
) {
	return class WithContext2 extends Component<OmitAdaptivity<P>> {
		static readonly contextType = Context2;

		render() {
			return (
				<Context2.Consumer>
					{(context: Context1Value) => {
							return (
								<WrappedComponent {...(this.props as any)} context2={context} />
						);
					}}
			</Context2.Consumer>
		);
		}
	};
}
