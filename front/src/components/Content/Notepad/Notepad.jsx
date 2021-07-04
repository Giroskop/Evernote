import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Placemark from './Placemark'
import PlacemarkForm from './PlacemarkForm'
export default function Notepad() {
	const notepadId = useParams().id
	console.log(notepadId)
	const notepad = useSelector(state =>
		state.notepads.find(item => item._id === notepadId)
	)
	console.log(notepad)
	const [isEditable, setEditable] = useState(false)
	const { innerWidth: width, innerHeight: height } = window
	console.log(width, height)

	return (
		<>
			{notepad ? (
				<>
					<div className='notepad'>
						<h1 className='notepad__title'>{notepad.name}</h1>
						<PlacemarkForm />
						<ul className='placemarks'>
							<Placemark isEditable={isEditable} setEditable={setEditable} />
							<Placemark isEditable={isEditable} setEditable={setEditable} />
							<Placemark isEditable={isEditable} setEditable={setEditable} />
							<Placemark isEditable={isEditable} setEditable={setEditable} />
							<Placemark isEditable={isEditable} setEditable={setEditable} />
						</ul>
						<div className={isEditable ? 'placemarkCloseArea' : ''}></div>
					</div>
				</>
			) : null}
		</>
	)
}
