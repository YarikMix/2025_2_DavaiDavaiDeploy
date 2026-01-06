import registrationForm from '../../components/registrationForm/registrationForm.js'
import router from '../../modules/router/index.js'
import {
	selectUserError,
} from '@/redux/features/user/selectors.js'
import { store } from '@/redux/store.js'
import Page from '../../modules/lib/basePage/basePage.js'
import template from "./registrationPage.hbs"
import { registerUserAction } from '@/redux/features/user/slice.js'

/**
 * Класс для отображения страницы регистрации.
 */
export default class RegistrationPage extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 * @param {Object} location Объект локации
	 */
	constructor(rootElement, location) {
		super(rootElement, location)
	}

	onSubmit = (login, password) => {
		store.dispatch(registerUserAction(login, password))
	}

	/**
	 * Обработчик изменения состояния
	 */
	handleStoreChange = () => {
		if (!selectUserError(store.getState())) {
			router.navigate('/')
		}
		this.unsubscribe?.()
	}

	/**
	 * Рендерит страницу регистрации и форму.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML(
			'afterbegin',
			template({
				text: 'Registration',
			}),
		)

		const form = new registrationForm(
			this.self.querySelector('#registration-form-container'),
			{
				onSubmit: this.onSubmit,
			},
		)
		form.render()

		this.unsubscribe = store.subscribe(this.handleStoreChange)
	}
}
