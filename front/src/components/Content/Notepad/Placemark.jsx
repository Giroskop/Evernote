import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pathChange } from '../../../redux/actions/pathAC'
import NotepadItem from './NotepadItem'

export default function Placemark({setEditable, isEditable}) {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(pathChange('/placemarks'))
	// }, [])
	// const notepads = useSelector(state => state.notepads)

  const [isOpen, setOpen] = useState(false)
  function placeMarkOpenHandler(e) {
    setEditable(true)
    setOpen(true)
  }
  function placeMarkCloseHandler() {
    setOpen(false)
    setEditable(false)
  }
  const index = 0
	return (
		<li className={`placemark ${isEditable ? 'placemarkEditable' : null}`} onClick={() => setEditable(true)}>
			<span className='placemark__index'>1</span>
			<div className='placemark__content'>
				<h2 className='placemark__title' contentEditable={isEditable}>title</h2>
				<p className='placemark__text' contentEditable={isEditable}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
					voluptate ipsa minus similique velit eligendi sit hic iure. Atque
					libero maiores animi quod iusto repellendus et sit autem dicta eum..
				</p>
			</div>
		</li>
	)
}
