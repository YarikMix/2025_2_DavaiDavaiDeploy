const isProduction = import.meta.env.VITE_IS_PRODUCTION === 'true'

export const serverAddr = isProduction
	? 'https://ddfilms.online/api'
	: 'http://localhost:5458/api'

export const serverAddrForStatic = isProduction
	? 'https://ddfilms.online'
	: 'http://localhost:5458'
