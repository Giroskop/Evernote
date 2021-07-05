import { useEffect, useRef } from 'react'

export default function useKey(key, callback) {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	})
	useEffect(() => {
		function handle(e) {
			if (e.code === key) {
				callback.current(e)
			}
		}

		document.addEventListener("keypress", handle)
		return () => document.removeEventListener("keypress", handle)
	}, [])
}
