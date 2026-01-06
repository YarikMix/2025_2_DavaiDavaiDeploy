import LoginForm from '../../components/loginForm/loginForm.js'
import router from '../../modules/router/index.js'
import {
	selectUserError,
} from '@/redux/features/user/selectors.js'
import { store } from '@/redux/store.js'
import Page from '../../modules/lib/basePage/basePage.js'
import template from "./loginPage.hbs"
import { loginUserAction } from '@/redux/features/user/slice.js'

/**
 * Класс для отображения страницы входа.
 */
export default class LoginPage extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 * @param {Object} location Объект локации
	 */
	constructor(rootElement, location) {
		super(rootElement, location)
	}

	onSubmit = (login, password) => {
		store.dispatch(loginUserAction(login, password))
	}

	handleStoreChange = () => {
		if (!selectUserError(store.getState())) {
			router.navigate('/')
		}
		this.unsubscribe?.()
	}

	/**
	 * Рендерит страницу входа и форму.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML(
			'afterbegin',
			template({
				text: 'Login',
			}),
		)

		const form = new LoginForm(
			this.self.querySelector('#login-form-container'),
			{
				onSubmit: this.onSubmit,
			},
		)
		form.render()

		this.unsubscribe = store.subscribe(this.handleStoreChange)
	}
}
