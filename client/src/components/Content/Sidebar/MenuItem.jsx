import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { NOTEPAD_CHANGE_POSITION } from '../../../redux/types/notepad'
export default function MenuItem({ notepad }) {

  const [selectedNotepad, setSelectedNotepad] = useState()

  function dragStartHandler(e, notepad) {
    // e.target.style.color = 'black'
    setSelectedNotepad(notepad)
  }
  function dragLeaveHandler(e) {
    // e.target.parentElement.style.background = 'none'
    // e.target.style.color = 'white'
  }
  function dragEndHandler(e) {
    // e.target.style.color = 'white'
  }
  function dragOverHandler(e) {
    e.preventDefault()
    // e.target.parentElement.style.background = 'orange'
    // e.target.style.color = 'black'
  }
  function dragDropHandler(e, notepad) {
    e.preventDefault()
    console.log(selectedNotepad, '<<<<<')
    // e.target.parentElement.style.background = 'none'
    // e.target.style.color = 'white'
    // dispatch({
    //   type: NOTEPAD_CHANGE_POSITION,
    //   payload: {
    //     // putItemId: get._id,
    //     getItemId: notepad._id
    //   }
    // })
  }
  

	return (
		<>
			<li
				className='sidebar__item'
				onDragStart={(e) => dragStartHandler(e, notepad)}
				onDragLeave={dragLeaveHandler}
				onDragEnd={dragEndHandler}
				onDragOver={dragOverHandler}
        onDrop={(e) => dragDropHandler(e, notepad)}
        draggable={true}
			>
				<Link to={`/notepads/${notepad._id}`} className='sidebar__item-link'>
					{notepad.name}
				</Link>
			</li>
		</>
	)
}
