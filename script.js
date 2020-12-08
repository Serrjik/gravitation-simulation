// Gravitational constant.
const G = 0.005 // 6.6743 / 10**11
// Плотность частиц.
const P = 0.1
// Расстояние, на котором частицы считаются столкнувшимися.
const COLLAPSE_LENGTH = 1

// Канвас, на котором будут отрисовываться частицы.
const canvas = new Canvas()

// Частицы, которые будут отрисованы на канвасе.
let particles = []

// Солнце.
particles.push(new Particle({
	x: canvas.view.width / 2,
	y: canvas.view.height / 2,
	drawSpeed: false,
	drawForce: false,
	mass: 100000,
	color: 'yellow',
}))

// Планета.
particles.push(new Particle({
	x: canvas.view.width / 2,
	y: canvas.view.height / 2 - 300,
	vx: 20,
	vy: 0,
	drawSpeed: false,
	drawForce: false,
	mass: 100,
	color: '#2E3A92',
}))

// Ещё одна планета.
particles.push(new Particle({
	x: canvas.view.width / 2 - 500,
	y: canvas.view.height / 2,
	vx: 0,
	vy: -22,
	drawSpeed: false,
	drawForce: false,
	mass: 150,
	color: '#ff7a18',
}))


// Создание частиц.
// for (let i = 0; i < 1000; i++) {
// 	// Создать частицы и заполнить ими массив частиц для отрисовки.
// 	particles.push(new Particle({
// 		x: getRandomBetween(0, canvas.view.width),
// 		y: getRandomBetween(0, canvas.view.height),
// 		mass: getRandomBetween(1, 10),
// 	}))
// }

// Добавить частицы на канвас.
canvas.add(...particles)

// Добавить канвас на страницу.
document.body.append(canvas.view)

requestAnimationFrame(tick)

function tick () {
	requestAnimationFrame(tick)

	// Пройти по всем частицам, которые нужно отрисовать.
	for (const particle of particles) {
		// Удалить все силы, приложенные к выбранной частице.
		particle.forces = []
	}

	// Пройти по всем парам частиц, которые нужно отрисовать.
	for (let i = 0; i < particles.length - 1; i++) {
		// Контрольная частица.
		const ctrlParticle = particles[i]

		for (let j = i + 1; j < particles.length; j++) {
			// Текущая частица.
			const currentParticle = particles[j]

			// Разность векторов контрольной и текущей частиц.
			const force = Vector.getDiff(
				ctrlParticle.position,
				currentParticle.position
			)
			// Модуль силы притяжения между контрольной и текущей частицами.
			const forceNumber =
				G * ctrlParticle.mass * currentParticle.mass /
				Math.max(force.length ** 2, 0.00001)

			// Сила притяжения между контрольной и текущей частицами.
			force.mult(forceNumber)

			// Добавить контрольной частице силу притяжения со стороны текущей.
			ctrlParticle.forces.push(force.getNegative())
			// Добавить текущей частице силу притяжения со стороны контрольной.
			currentParticle.forces.push(force)
		}
	}

	// Пройти по всем частицам.
	for (const particle of particles) {
		// Результирующая сила притяжения, действующая на выбранную частицу.
		const force = particle.force
		// Установить ускорение выбранной частице.
		particle.acceleration = new Vector(
			force.x / particle.mass,
			force.y / particle.mass
		)
	}

	// Пройти по всем частицам.
	for (const particle of particles) {
		// Прибавить ускорение к скорости выбранной частицы.
		particle.speed.add(particle.acceleration)
		// Переместить выбранную частицу на величину скорости.
		particle.position.add(particle.speed)
	}

	// Новый набор частиц после столкновений и слипаний.
	const newParticles = []
	// Набор частиц, которые должны быть удалены.
	const forDelete = []

	// Пройти по всем парам частиц, которые нужно отрисовать.
	for (let i = 0; i < particles.length - 1; i++) {
		// Первая выбранная частица.
		const a = particles[i]

		// Если выбранная частица уже удалена:
		if (forDelete.includes(a)) {
			continue
		}

		for (let j = i + 1; j < particles.length; j++) {
		// Вторая выбранная частица.
		const b = particles[j]

			// Если выбранная частица уже удалена:
			if (forDelete.includes(b)) {
				continue
			}

			// Разность векторов пары частиц.
			const diff =
				Vector.getDiff(a.position, b.position)

			/*
				Если расстояние между парой частиц меньше половины суммы
				радиусов частиц (частицы столкнулись):
			*/
			if (diff.length < (a.r + b.r) / 2) {
				// Считать, что эта пара частиц столкнулись.
				/*
					Превратить эту пару частиц в одну частицу с массой равной
					сумме масс этих двух частиц.
				*/
				// Сумма масс этих двух частиц.
				const mass = a.mass + b.mass

				// Новая частица вместо пары столкнувшихся.
				const newParticle = new Particle({ mass })
				/*
					Ставим новую частицу между столкнувшимися точками в точку
					чуть смещённую в сторону меньшей частицы.
				*/
				newParticle.position = new Vector(
					b.position.x + (diff.x * a.mass) / newParticle.mass,
					b.position.y + (diff.y * a.mass) / newParticle.mass
				)
				newParticle.speed = new Vector(
					a.mass / newParticle.mass * a.speed.x +
						b.mass / newParticle.mass * b.speed.x,
					a.mass / newParticle.mass * a.speed.y +
						b.mass / newParticle.mass * b.speed.y
				)

				/*
					Добавить новую частицу в новый набор частиц
					после столкновений и слипаний.
				*/
				newParticles.push(newParticle)
				/*
					Добавить столкнувшиеся частицы в набор частиц,
					которые должны быть удалены.
				*/
				forDelete.push(a, b)
			}
		}
	}

	// Новый набор частиц для отрисовки.
	const updateParticles = []
	// Пройти по всем частицам.
	for (const particle of particles) {
		// Если выбранная частица не должна быть удалена:
		if (!forDelete.includes(particle)) {
			// Добавить эту частицу в новый набор частиц для отрисовки.
			updateParticles.push(particle)
		}
	}

	/*
		Добавить в новый набор частиц для отрисовки все частицы из нового
		набора частиц после столкновений и слипаний.
	*/
	updateParticles.push(...newParticles)
	// Обновить набор частиц, которые будут отрисованы на канвасе.
	particles = updateParticles
	// Обновить набор частиц в контейнере элементов, которые нужно отрисовать.
	canvas.container = particles

	// Очистить канвас.
	canvas.clear()
	// Отрисовать частицы на канвасе.
	canvas.draw()
}