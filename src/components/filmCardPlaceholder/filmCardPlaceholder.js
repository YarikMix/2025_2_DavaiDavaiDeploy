import Component from '../../modules/lib/baseComponent/baseComponent.js'
import template from "./filmCardPlaceholder.hbs"

export default class FilmCardPlaceholder extends Component {
	constructor(parent, props = {}) {
		super(parent, props)
	}

	get self() {
		return this.parent.querySelector(`.placeholder`)
	}

	render() {
		const Width = this.parent.offsetWidth + 'px'
		const Height = this.parent.offsetHeight + 'px'
		this.parent.insertAdjacentHTML('beforeend', template())
		this.self.style.width = Width
		this.self.style.height = Height
	}
}
