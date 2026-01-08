export const createWebStorage = (storage = localStorage) => ({
	getItem: key => {
		return new Promise(resolve => {
			resolve(storage.getItem(key))
		})
	},
	setItem: (key, value) => {
		return new Promise(resolve => {
			storage.setItem(key, value)
			resolve()
		})
	},
	removeItem: key => {
		return new Promise(resolve => {
			storage.removeItem(key)
			resolve()
		})
	},
})
