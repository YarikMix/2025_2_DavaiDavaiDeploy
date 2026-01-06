import Component from '../../modules/lib/baseComponent/baseComponent.js'
import template from "./cardGrid.hbs"
import { fetchFilms } from '@/redux/features/film/slice.js'
import { store } from '@/redux/store.js'

export default class CardGrid extends Component {
	constructor(parent, props = {}) {
		super(parent, props)
	}

	get self() {
		return document.querySelector(`.card-grid`)
	}

	get grid() {
		return this.self?.querySelector('.grid')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', template())

		store.dispatch(fetchFilms())
	}
}
