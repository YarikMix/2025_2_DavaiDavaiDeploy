import Button from '../../uikit/button/button.js'
import Input from '../../uikit/input/input.js'
import PasswordInput from '../../uikit/passwordInput/passwordInput.js'
import Component from '../../modules/lib/baseComponent/baseComponent.js'
import loginFormUsecase from './loginForm.usecase.js'
import template from "./loginForm.hbs"

class LoginForm extends Component {
	#parent
	#loginInput
	#passwordInput
	#button
	#onSubmit

	constructor(parent, props) {
		super(
			parent,
			{
				id: loginFormUsecase.id,
			},
		)
		this.#parent = parent
		this.#loginInput = null
		this.#passwordInput = null
		this.#button = null
		this.#onSubmit = props.onSubmit
	}

	remove() {
		this.#loginInput?.remove()
		this.#passwordInput?.remove()
		this.#button?.remove()
	}

	/**
	 * Валидация данных формы
	 */
	#validateData() {
		const isLoginValid = this.#loginInput.isValid()
		const isPasswordValid = this.#passwordInput.isValid()

		return isLoginValid && isPasswordValid
	}

	/**
	 * Обработчик отправки формы
	 */
	#handleSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		const isValid = this.#validateData()

		if (!isValid) {
			e.target.blur()
		}
		if (isValid) {
			this.#onSubmit(
				this.#loginInput.getValue(),
				this.#passwordInput.getValue(),
			)
		}
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML(
			'beforeend',
			template({
				action: loginFormUsecase.action,
				id: loginFormUsecase.id,
			}),
		)

		this.#loginInput = new Input(this.self, loginFormUsecase.inputs.login)
		this.#loginInput.render()

		this.#passwordInput = new PasswordInput(
			this.self,
			loginFormUsecase.inputs.password,
		)
		this.#passwordInput.render()

		this.#button = new Button(document.querySelector('#form__footer'), {
			...loginFormUsecase.buttons.submitBtn,
			onSubmit: this.#handleSubmit,
		})
		this.#button.render()
	}
}

export default LoginForm
