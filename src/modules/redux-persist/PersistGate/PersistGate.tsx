import { Component } from 'ddd-react';

export interface PersistGateProps {
	persistor: any;
	loading?: Component | null;
	onBeforeLift?: () => void | Promise<void>;
}

export interface PersistGateState {
	bootstrapped: boolean;
}

/**
 * Компонент, который задерживает отрисовку UI до тех пор,
 * пока не будет восстановлено состояние из persistent storage
 */
export class PersistGate extends Component<PersistGateProps, PersistGateState> {
	static readonly defaultProps: Partial<PersistGateProps> = {
		loading: null,
	};

	private unsubscribe?: () => void;
	private checkStateTimeout?: NodeJS.Timeout;

	constructor(props: PersistGateProps, parentComponent: Component) {
		super(props, parentComponent);
		this.state = {
			bootstrapped: false,
		};
	}

	didMount(): void {
		// Подписываемся на события persistor
		this.unsubscribe = this.props.persistor.subscribe(
			this.handlePersistorState,
		);

		// Проверяем начальное состояние
		void this.handlePersistorState();
	}

	willUnmount(): void {
		// Отписываемся от событий при размонтировании
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = undefined;
		}

		// Очищаем таймер
		if (this.checkStateTimeout) {
			clearTimeout(this.checkStateTimeout);
		}
	}

	handlePersistorState = async (): Promise<void> => {
		const { persistor } = this.props;

		try {
			// getState возвращает промис
			const state = await persistor.getState();
			const bootstrapped = state && state._persist !== undefined;

			if (bootstrapped) {
				// Вызываем колбэк перед показом приложения
				if (this.props.onBeforeLift) {
					const result = this.props.onBeforeLift();

					// Если колбэк возвращает промис, ждем его выполнения
					if (result && typeof result.then === 'function') {
						await result;
					}
				}

				this.setState({ bootstrapped: true });

				// Отписываемся после успешной загрузки
				if (this.unsubscribe) {
					this.unsubscribe();
					this.unsubscribe = undefined;
				}
			} else {
				// Используем setTimeout для предотвращения блокировки UI
				this.checkStateTimeout = setTimeout(this.handlePersistorState, 50);
			}
		} catch {
			// Если произошла ошибка, все равно показываем приложение
			this.setState({ bootstrapped: true });
		}
	};

	render() {
		const { loading, children } = this.props;
		const { bootstrapped } = this.state;

		// Показываем loading до тех пор, пока не загрузится состояние
		if (!bootstrapped) {
			return <>{loading}</>;
		}

		return <>{children}</>;
	}
}
