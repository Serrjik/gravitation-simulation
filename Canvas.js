// Класс для работы с канвасом.
class Canvas {
	constructor () {
		// Элемент с канвасом.
		this.view = document.createElement('canvas')
		// Контекст элемента с канвасом.
		this.context = this.view.getContext('2d')

		// Контейнер для элементов, которые нужно отрисовать.
		this.container = []

		// Выставить изначальный размер канваса.
		this.resize()
		/*
			Повесить обработчик изменения размера окна.
			Изменять размер канваса по размеру окна.
		*/
		window.addEventListener('resize', () => this.resize())
	}

	// Метод очищает канвас.
	clear () {
		this.view.width = this.view.width
	}

	/*
		Метод отрисовывает на канвасе все элементы из контейнера для элементов,
		которые нужно отрисовать.
	*/
	draw () {
		// Пройти по всем элементам в контейнере.
		for (const item of this.container) {
			/*
				Вызвать у выбранного элемента метод, который отрисовывает его.
				Передать ему экземпляр канваса,
				на котором нужно отрисовать элемент.
			*/
			item.draw(this)
		}
	}

	// Метод отрисовывает круг с переданными параметрами.
	drawCircle (param) {
		this.context.beginPath()
		this.context.arc(param.x, param.y, param.r, 0, 2 * Math.PI)

		// Если есть заливка круга:
		if (param.fillStyle) {
			this.context.fillStyle = param.fillStyle
			// Отрисовать закрашенный круг.
			this.context.fill()
		}

		// Если есть обводка круга:
		if (param.strokeStyle) {
			this.context.strokeStyle = param.strokeStyle
			// Отрисовать круг с обводкой.
			this.context.stroke()
		}
	}

	// Метод отрисовывает вектор с переданными параметрами.
	drawLine (param) {
		this.context.beginPath()
		this.context.moveTo(param.x1, param.y1)
		this.context.lineTo(param.x2, param.y2)
		this.context.lineWidth = param.lineWidth
		// Если передан цвет вектора:
		if (param.strokeStyle) {
			this.context.strokeStyle = param.strokeStyle
			this.context.stroke()
		}
	}

	// Метод устанавливает размеры канваса.
	resize () {
		this.view.width = window.innerWidth
		this.view.height = window.innerHeight
	}

	/*
		Метод добавляет переданные элементы в контейнер для элементов,
		которые нужно отрисовать.
	*/
	add (...items) {
		// Пройти по всем переданным элементам.
		for (const item of items) {
			// Если выбранный элемент ещё не был добавлен в контейнер:
			if (!this.container.includes(item)) {
				// Добавить его в контейнер!
				this.container.push(item)
			}
		}
	}

	/*
		Метод удаляет переданные элементы из контейнера для элементов,
		которые нужно отрисовать.
	*/
	remove (item) {
		// Пройти по всем переданным элементам.
		for (const item of items) {
			// Если выбранный элемент присутствует в контейнере:
			if (this.container.includes(item)) {
				// Удалить его из контейнера!
				const index = this.container.indexOf(item)
				this.container.splice(index, 1)
			}
		}
	}
}