import Page from '../../modules/lib/basePage/basePage.js'
import template from "./notFoundPage.hbs"

/**
 * Класс, представляющий страницу 404 (не найдено).
 */
export default class NotFoundPage extends Page {
	/**
	 * Создает экземпляр страницы 404.
	 * @param {HTMLElement} rootElement Родительский элемент, в который рендерится страница.
	 * @param {Object} location Объект локации
	 */
	constructor(rootElement, location) {
		super(rootElement, location)
	}

	/**
	 * Отображает страницу 404 в DOM.
	 * Вставляет шаблон и очищает родительский элемент.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('afterbegin', template())
	}
}
