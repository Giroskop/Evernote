import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pathChange } from '../../../redux/actions/pathAC'
import { ALL_MODAL_CLOSE, PLACEMARK_EDIT_CLOSE, PLACEMARK_EDIT_OPEN } from '../../../redux/types/modal'
import NotepadItem from './NotepadItem'

export default function Placemark({ name,
  text,
  id,
  tags,
  bcColor,
  index,
  created
}) {
	const dispatch = useDispatch()
  const {backLayoutActive, placemarkEditActive} = useSelector(state => state.modals)
	const [isEditable, setEditable] = useState(false)
  const [isOpen, setOpen] = useState(false)
  function placeMarkOpenHandler(e) {
    setEditable(true)
    setOpen(true)
  }
  function placeMarkCloseHandler() {
    setOpen(false)
    setEditable(false)
  }
  function placemarkEditOpenHandler() {
    dispatch({
      type: PLACEMARK_EDIT_OPEN
    })
  }
  function placemarkEditCloseHandler() {
    dispatch({
      type: ALL_MODAL_CLOSE
    })
  }
	return (
		<li className={`placemark ${placemarkEditActive ? 'placemarkEditable' : null} bc--${bcColor}`} id={id} onClick={placemarkEditOpenHandler}>
			<span className='placemark__index'>{index+1}</span>
			<div className='placemark__content'>
				<h2 className='placemark__title' contentEditable={placemarkEditActive}>{name}</h2>
				<p className='placemark__text' contentEditable={placemarkEditActive}>
					{text}
				</p>
        <span className="placemark__created">
          {created}
        </span>
			</div>
		</li>
	)
}
