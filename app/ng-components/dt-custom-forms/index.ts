(function (app) {
	'use strict'
	const moduleName = 'CustomForms'
	let isRunning = false

	let DAO
	let storage = new Map()
	// let storage = {}

	let sandbox

	const mod = {
		// factories
		sandbox,

		// instances
		DAO,
		storage,

		init,
		stop,
		isRunning
	}

	app.register(moduleName, mod)

	/**
	 * to init the module, called by app
	 */
	function init(sandboxRef) {
		sandbox = sandboxRef
		// console.dir(sandbox)
		// storage = storageFact(sandbox)
		// DAO = DAOFact(sandbox, storage)
		// IO = IOFact(sandbox, storage)

		console.info(`${moduleName} initialized!`)
		isRunning = true
		return isRunning
	}

	/**
	 * to stop the module, called by app
	 */
	function stop() {
		DAO = undefined
		// IO = undefined
		storage = undefined

		console.warn(`${moduleName} stoped!`)
		isRunning = false
		return isRunning
	}


})(app)