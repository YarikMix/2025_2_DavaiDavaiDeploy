/**
 * Базовый класс компонентов
 * @class
 * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен компонент.
 * @param {Object} props - Объект с конфигурацией компонента.
 * @param {Object} state - Состояние компонента.
 */
export default class Component {
	#state

	constructor(parent, props, state = {}) {
		this.parent = parent
		this.props = props
		this.#state = state
	}

	get self() {
		return document.getElementById(this.props.id)
	}

	get state() {
		return this.#state
	}

	setState(newState) {
		this.#state = newState
	}
}
