// Функция возвращает случайное число от min до max.
function getRandomBetween (min, max) {
	return min + Math.floor(Math.random() * (max - min + 1))
}

// Функция запоминает историю последнего запуска переданной функции.
function lastMemorize (callback) {
	let lastKey = null
	let value =  null

	return function (args) {
		const key = JSON.stringify(args)

		if (key !== lastKey) {
			value = callback(...args)
		}

		return value
	}
}