import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper.js'
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper.js'
import Component from '../../modules/lib/baseComponent/baseComponent.js'
import template from "./filmCard.hbs"

/**
 * Класс FilmCard представляет карточку фильма.
 * Наследуется от базового класса Component.
 */
export default class FilmCard extends Component {
	/**
	 * Создает экземпляр FilmCard.
	 * @param {HTMLElement} parent - Родительский DOM-элемент, в который будет добавлена карточка.
	 * @param {Object} [props={}] - Свойства карточки фильма.
	 */
	constructor(parent, props = {}) {
		super(parent, props)
	}

	/**
	 * Возвращает DOM-элемент текущей карточки фильма.
	 * @returns {HTMLElement|null} DOM-элемент карточки фильма или null, если элемент не найден.
	 */
	get self() {
		return document.querySelector(`#film-${this.props.id}`)
	}

	/**
	 * Отрисовывает карточку фильма в родительский элемент.
	 * Формирует HTML-контекст и вставляет его в DOM.
	 * @returns {void}
	 */
	render() {
		let context = {
			id: this.props.id,
			image: this.props.image,
			title: this.props.title,
			info: this.props.info,
			rating: this.props.rating.toFixed(1),
			ratingType: getRatingType(this.props.rating),
		}

		this.parent?.insertAdjacentHTML('beforeend', template(context))
	}

	/**
	 * Повторно отрисовывает карточку фильма.
	 * @returns {void}
	 */
	rerender() {
		let context = {
			id: this.props.id,
			image: this.props.image,
			title: this.props.title,
			info: this.props.info,
			rating: formatRating(this.props.rating),
			ratingType: getRatingType(this.props.rating),
		}
		if (!this.self) {
			return
		}
		this.self.outerHTML = template(context)
	}
}
