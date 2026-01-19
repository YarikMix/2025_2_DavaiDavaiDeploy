import 'ddd-ui-kit/dist/ddd-ui-kit.css';
import 'reset-css/reset.css';

import { ErrorBoundary } from '@/modules/errorBoundary/ErrorBoundary.tsx';
import { Component, render } from '@/modules/react';
import { compose, connect, StoreProvider } from '@/modules/redux';
import { PersistGate } from '@/modules/redux-persist/PersistGate/PersistGate.tsx';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { persistor, store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Footer } from './components/footer/footer.tsx';
import { Header } from './components/header/header.tsx';
import {
	AppToast,
	ToastContainer,
} from './components/toastContainer/toastContainer.tsx';
import { AdaptivityProvider } from './modules/adaptivity/AdaptivityProvider';
import { ModalsProvider } from './modules/modals/modalsProvider.tsx';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import { Route } from './modules/router/route.tsx';
import { Routes } from './modules/router/routes.tsx';
import type { WithRouterProps } from './modules/router/types/withRouterProps.ts';
import { withRouter } from './modules/router/withRouter.tsx';
import { ActorPage } from './pages/actorPage/actorPage.tsx';
import { CalendarPage } from './pages/calendarPage/calendarPage.tsx';
import { CompilationPage } from './pages/compilationPage/compilationPage.tsx';
import { FilmPage } from './pages/filmPage/filmPage.tsx';
import { GenrePage } from './pages/genrePage/genrePage';
import { HomePage } from './pages/homePage/homePage.tsx';
import { LoginPage } from './pages/loginPage/loginPage.tsx';
import { RegisterPage } from './pages/registerPage/registerPage.tsx';
import { SearchPage } from './pages/searchPage/searchPage.tsx';
import { UserPage } from './pages/userPage/userPage.tsx';
import actions from './redux/features/user/actions.ts';
import { selectUser } from './redux/features/user/selectors.ts';
import type { Map } from './types/map.ts';
import type { ModelsUser } from './types/models.ts';

window.addEventListener('online', () => {
	AppToast.info('Соединение восстановлено12345678!');
});

window.addEventListener('offline', () => {
	AppToast.info('Нет подключения к сети — вы в офлайн-режиме!');
});

interface AppProps {
	user: ModelsUser;
	checkUser: () => {};
}

class AppComponent extends Component<AppProps & WithRouterProps> {
	didMount() {
		this.props.checkUser();
	}

	render() {
		const isAuthPageOpen =
			this.props.router.path.startsWith('/login') ||
			this.props.router.path.startsWith('/register');

		return (
			<div class="layout">
				<ToastContainer />
				{!isAuthPageOpen && <Header />}
				<Routes>
					<Route href="/" component={<HomePage />} />
					<Route href="/films/:id" component={<FilmPage />} />
					<Route href="/actors/:id" component={<ActorPage />} />
					<Route href="/login" component={<LoginPage />} />
					<Route href="/register" component={<RegisterPage />} />
					<Route href="/genres/:id" component={<GenrePage />} />
					<Route href="/profile" component={<UserPage />} />
					<Route href="/calendar" component={<CalendarPage />} />
					<Route href="/search" component={<SearchPage />} />
					<Route href="/compilations/:id" component={<CompilationPage />} />
				</Routes>
				{!isAuthPageOpen && <Footer />}
			</div>
		);
	}
}

class ProvidersLayout extends Component {
	render() {
		return (
			<ErrorBoundary>
				<ModalsProvider>
					<StoreProvider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<AdaptivityProvider>
								<RouterProvider>{this.props.children}</RouterProvider>
							</AdaptivityProvider>
						</PersistGate>
					</StoreProvider>
				</ModalsProvider>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	checkUser: () => dispatch(actions.checkUserAction()),
});

const App = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(AppComponent);

class Test extends Component<{}, { test: boolean }> {
	state = {
		test: false,
	};

	didMount() {
		setInterval(() => {
			this.setState({ test: !this.state.test });
		}, 1000);
	}

	render() {
		if (this.state.test) {
			return this.props.children;
		}

		return null;
	}
}

class App1 extends Component {
	render() {
		return (
			<div>
				<Test>
					<span>333</span>
					<br />
					<span>444</span>
				</Test>
				<h3>asdf</h3>
			</div>
		);
	}
}

render(<App1 />, document.body);
