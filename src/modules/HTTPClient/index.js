import { HTTPClient } from '@/modules/HTTPClient/HTTPClient.js'

const TIMEOUT = 1000

export default HTTPClient.create({
	baseUrl: "/api",
	headers: {},
	timeout: TIMEOUT,
})
