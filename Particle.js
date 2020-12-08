// Класс который описывает частицы.
class Particle {
	constructor (param = {}) {
		// Координаты частицы.
		this.position = new Vector(param.x ?? 0, param.y ?? 0)

		// Скорость частицы.
		this.speed = new Vector(param.vx ?? 0, param.vy ?? 0)

		// Ускорение частицы.
		this.acceleration = new Vector(0, 0)

		// Силы, приложенные к частице.
		this.forces = []

		// Флаг - отрисовывать ли вектор скорости?
		this.drawSpeed = param.drawSpeed ?? true
		// Флаг - отрисовывать ли вектор силы, приложенной к частице?
		this.drawForce = param.drawForce ?? true

		// Масса частицы (кг).
		this.mass = param.mass ?? 1,
		// Цвет частицы.
		this.color = param.color ?? 'black'
	}

	// Геттер возвращает результирующую всех сил, приложенных к частице.
	get force () {
		/*
			Создать новый нулевой вектор
			и записать в него сумму всех переданных векторов сил.
		*/
		return Vector.get().add(...this.forces)
	}

	// Геттер возвращает радиус частицы.
	get r () {
		return (this.mass / (Math.PI * P))**0.5 < 30 ? (this.mass / (Math.PI * P))**0.5 : 30
	}

	// Метод отрисовывает частицу на переданном экземпляре канваса.
	draw(canvas) {
		/*
			Вызвать метод канваса, который отрисовывает
			круг с переданными параметрами.
		*/
		canvas.drawCircle({
			x: this.position.x,
			y: this.position.y,
			r: this.r,
			fillStyle: this.color,
		})

		// Если нужно отрисовывать вектор скорости:
		if (this.drawSpeed) {
			/*
				Вызвать метод класса Canvas,
				который отрисовывает вектор с переданными параметрами.
			*/
			canvas.drawLine({
				x1: this.position.x,
				y1: this.position.y,
				x2: this.position.x + this.speed.x,
				y2: this.position.y + this.speed.y,
				lineWidth: 1,
				strokeStyle: 'blue',
			})
		}

		// Если нужно отрисовывать вектор силы:
		if (this.drawForce) {
			// Вектор силы, который нужно отрисовать.
			const force = this.force

			/*
				Вызвать метод класса Canvas,
				который отрисовывает вектор с переданными параметрами.
			*/
			canvas.drawLine({
				x1: this.position.x,
				y1: this.position.y,
				x2: this.position.x + force.x,
				y2: this.position.y + force.y,
				lineWidth: 1,
				strokeStyle: 'red',
			})
		}
	}
}