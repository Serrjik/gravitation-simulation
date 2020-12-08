// Класс описывает экземпляры с координатами x, y, у которых есть векторные поля.
class Vector {
	constructor(x, y) {
		// Координаты экземпляра.
		this.x = x
		this.y = y
	}

	// Метод возвращает новый по умолчанию нулевой вектор.
	static get (x = 0, y = 0) {
		return new Vector(x, y)
	}

	// Метод возвращает вектор разности двух переданных векторов.
	static getDiff (v1, v2) {
		return new Vector(v1.x - v2.x, v1.y - v2.y)
	}

	// Метод возвращает новый вектор, противоположный переданному.
	static getNegative (vector) {
		return new Vector(-vector.x, -vector.y)
	}

	// Геттер возвращает длину переданного вектора.
	get length () {
		return (this.x ** 2 + this.y ** 2)**0.5
	}

	// Метод складывает вектора.
	add (...vectors) {
		// Пройти по всем переданным векторам.
		for (const vector of vectors) {
			this.x += vector.x
			this.y += vector.y
		}

		return this
	}

	// Метод умножает вектор на переданный множитель.
	mult (n) {
		this.x *= n
		this.y *= n

		return this
	}

	// Метод возвращает вектор, противоположный выбранному.
	getNegative () {
		return Vector.getNegative(this)
	}
}