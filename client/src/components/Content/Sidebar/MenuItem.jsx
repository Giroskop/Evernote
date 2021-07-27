import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function MenuItem({ notepad }) {

  const [currentNotepad, setCurrentNotepad] = useState(null)

  const notepads = []
  function setNotepads() {}

  function dragStartHandler(e, notepad) {
    console.log(e.target.innerText, 'start--------')
    e.target.style.color = 'black'
    setCurrentNotepad(notepad)
  }
  function dragLeaveHandler(e) {
    console.log(e.target.innerText, 'leave--------')
    e.target.parentElement.style.background = 'none'
    e.target.style.color = 'white'
  }
  function dragEndHandler(e) {
    console.log(e.target.innerText, 'end--------')
    e.target.style.color = 'white'
  }
  function dragOverHandler(e) {
    e.preventDefault()
    e.target.parentElement.style.background = 'orange'
    e.target.style.color = 'black'
  }
  function dragDropHandler(e, notepad) {
    e.preventDefault()
    console.log(e.target.innerText, 'drop--------')
    e.target.parentElement.style.background = 'none'
    e.target.style.color = 'white'
    setNotepads(notepads.map(item => {
      if (item.id === notepad.id) {
        return {...item}
      }
    }))
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
			>
				<Link to={`/notepads/${notepad._id}`} className='sidebar__item-link'>
					{notepad.name}
				</Link>
			</li>
		</>
	)
}
