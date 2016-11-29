/**
 * The sandbox is the mediator in the application, is in charge of the communications
 * between modules and between webapp and back end services, ensuring a loose couplig
 * across all the application.
 * 
 * The modules or components just need to know about the sandbox.
 */

(function (app) {
	'use strict'

	app.setSandbox(sandboxFact)

	function sandboxFact(httpUrl, wsUrl) {

		// hold the rederence to the event listeners
		const eventList = new Map()
		const askListeners = new Map()


		// the public API
		const sandbox = {

			// event emmiter and handler
			emit,
			on,
			removeListener,

			// one response to multiple
			ask,
			answer,
			removeAnswer,

			// http
			http: Object.freeze({
				post: httpPost,
				get: httpGet,
				delete: httpDelete,
				put: httpPut
			}),

			// io
			io: Object.freeze({
				// connect: ioConnect,
				emit: ioEmit,
				on: ioOn
			})
		}


		return Object.freeze(sandbox)
		// return sandbox

		/**
		 * This fire the event and call
		 * all the functions linked to this particular event
		 * @param {String} eventName - id to the event listener
		 * @param {any} data - data to be passed as argument to the listener
		 */
		function emit(eventName, data) {
			if (eventList.has(eventName)) {
				let count = 0
				eventList.get(eventName).forEach(listener => {
					count++
					listener(data)
				})
			}
		}

		/**
		 * This associate each function to this particular event
		 * @param {String} eventName - id to the event listener
		 * @param {Function} callback - logic to be triggered when
		 *  the event is emited
		 */
		function on(eventName, callback) {
			// console.info(`registering listener for ${eventName}`)
			if (!eventList.has(eventName)) eventList.set(eventName, new Set())
			eventList.get(eventName).add(callback)
		}

		/**
		 * This remove the function from this particular event
		 * @param {String} eventName - id to the event listener
		 * @param {Function} callback - logic to be triggered when
		 *  the event is emited
		 */
		function removeListener(eventName, callback) {
			// console.info(`registering listener for ${eventName}`)
			if (eventList.has(eventName)) {
				eventList.get(eventName).delete(callback)
			}
		}

		/**
		 * Ask for an spesific resource or action and return the response
		 * @param {String} question - string to identify the question
		 * @param {Object} data - extra data to be procesed
		 * @return {any} answer - pass the return provided by the answer handler
		 */
		function ask(question, data) {
			let listener
			if (askListeners.has(question)) {
				listener = askListeners.get(question)
				return listener(data)
			}
			else return undefined
		}

		/**
		 * Resgister an answer to a question,
		 * only one answer will be registered for each qustion
		 * @param {String} question - string to identify the question
		 * @param {Function} callback - login to answer the question
		 * @return {Boolean} isRegistered
		 *    - true if the answer is registered or false if is already an answer
		 */
		function answer(question, callback) {
			if (askListeners.has(question)) return false
			askListeners.set(question, callback)
			return true
		}

		function removeAnswer(){}

		/** Wraper to http.post */
		function httpPost(path, data) {
			let url = httpUrl + path
			console.log(path, data)
			return request('POST', url)
		}

		/** Wraper to http.put */
		function httpPut(path, data) {
			
			console.log(path, data)
		}

		/** Wraper to http.get */
		function httpGet(path, data) {
			
			console.log(path, data)
		}

		/** Wraper to http.delete */
		function httpDelete(path, data) {
			
			console.log(path, data)
		}

		/** connecto to socket */
		// function ioConnect(...data) { io.connect(...data) }
		/** emit to socket */
		function ioEmit(...data) { io.emit(...data) }
		/** listen on socket */
		function ioOn(...data) { io.on(...data) }



	} // EoFact


	function request(method, url, body, isAuthenticted = true) {
		return new Promise((resolve, reject) => {
			const r = new XMLHttpRequest()
			method = method.toUpperCase()
			if (isAuthenticted) {
				const token = window.localStorage.getItem('token')
				if(token)
					r.setRequestHeader('x-access-token', token)
			}
			r.open(method, url, true)
			r.send(body);
			r.onreadystatechange = function () {
				if (r.readyState != 4 || r.status != 200) return
				alert("Success: " + r.responseText);
				resolve(r.responseText)
			}
			// body.token = token
		})
	}

})(app)
