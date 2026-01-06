import CardGrid from '../../components/cardGrid/cardGrid.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import Page from '../../modules/lib/basePage/basePage.js'
import template from "./homePage.hbs"

/**
 * Класс для отображения главной страницы.
 */
export default class Home extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 * @param {Object} location Объект локации
	 */
	constructor(rootElement, location) {
		super(rootElement, location)
	}

	/**
	 * Ссылка на `.main` внутри страницы.
	 * @returns {HTMLElement | null}
	 */
	get main() {
		return this.self.querySelector('.main')
	}

	/**
	 * Ссылка на `.films` внутри страницы.
	 * @returns {HTMLElement | null}
	 */
	get films() {
		return this.self.querySelector('.films')
	}

	/**
	 * Рендерит главную страницу: слайдер жанров, карточки фильмов и TopFilm.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('afterbegin', template())

		this.topFilm = new TopFilm(this.main)
		this.topFilm.render()

		this.genreSlider = new GenreSlider(this.main)
		this.genreSlider.render()

		this.cardGrid = new CardGrid(this.films)
		this.cardGrid.render()
	}

	/**
	 * Очистка/отписка от событий (если реализовано).
	 */
	destroy() {
		this.cardGrid.destroy()
		this.genreSlider.destroy()
	}
}
