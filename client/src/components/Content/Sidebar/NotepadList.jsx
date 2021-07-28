import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { NOTEPAD_CHANGE_POSITION } from '../../../redux/types/notepad'

export default function NotepadList() {
	const dispatch = useDispatch()
	const notepads = useSelector(state => state.notepads)
	const [selectedNotepad, setSelectedNotepad] = useState()

	function dragStartHandler(e, notepad) {
		e.target.style.color = 'black'
		setSelectedNotepad(notepad)
	}
	function dragLeaveHandler(e) {
		e.target.parentElement.style.background = 'none'
		e.target.style.color = 'white'
	}
	function dragEndHandler(e) {
		// e.target.style.color = 'white'
	}
	function dragOverHandler(e) {
		e.preventDefault()
		e.target.parentElement.style.background = 'orange'
		e.target.style.color = 'black'
	}
	function dragDropHandler(e, notepad) {
		e.preventDefault()
		e.target.parentElement.style.background = 'none'
    e.target.style.color = 'white'
		dispatch({
			type: NOTEPAD_CHANGE_POSITION,
			payload: {
				draggedNotepadId: selectedNotepad.position,
				replacedNotepadId: notepad.position,
			},
		})
	}
	function sortByPosition(a, b) {
		return a.position - b.position
	}

	return (
		<ul className='sidebar__list'>
			{notepads.sort(sortByPosition).map(notepad => (
				// <MenuItem notepad={notepad} key={nanoid(10)}/>
				<li
					className='sidebar__item'
					onDragStart={e => dragStartHandler(e, notepad)}
					onDragLeave={dragLeaveHandler}
					onDragEnd={dragEndHandler}
					onDragOver={dragOverHandler}
					onDrop={e => dragDropHandler(e, notepad)}
					draggable
				>
					<Link to={`/notepads/${notepad._id}`} className='sidebar__item-link'>
						{notepad.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
