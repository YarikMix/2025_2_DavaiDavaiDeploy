import Component from '../../modules/lib/baseComponent/baseComponent.js'
import template from "./footer.hbs"

/**
 * Шапка
 */
class Footer extends Component {
	#parent

	/**
	 * Конструктор класса
	 * @param {object} params - параметры
	 * @param {Function} params.navigate - функция навигации по страницам
	 */
	constructor(parent) {
		super(parent, { id: 'footer' })
		this.#parent = parent
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', template())
	}
}

export default Footer
