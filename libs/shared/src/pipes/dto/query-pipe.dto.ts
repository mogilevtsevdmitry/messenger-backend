type Mixed = number | boolean | string

class Entities {
	user: Mixed
	token: boolean

	constructor(defaultValue: Mixed) {
		this.user = defaultValue
		this.token = false
	}
}

export class QueryDto {
	include = new Map<string, boolean>(Object.entries(new Entities(false)))
	take = new Map<string, number>(Object.entries(new Entities(10)))
}
