import Component from '../../modules/lib/baseComponent/baseComponent.js'
import template from "./layout.hbs"

/**
 * Макет
 */
class Layout extends Component {
	#parent

	/**
	 * Конструктор класса
	 * @param {Element} parent - родительский элемент
	 */
	constructor(parent) {
		super(parent, { id: 'layout' })
		this.#parent = parent
	}

	/**
	 * Рендеринг страницы
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', template())
	}
}

export default Layout
