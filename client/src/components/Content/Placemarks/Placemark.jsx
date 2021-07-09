import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pathChange } from '../../../redux/actions/pathAC'
import {
	ALL_MODAL_CLOSE,
	PLACEMARK_EDIT_CLOSE,
	PLACEMARK_EDIT_OPEN,
} from '../../../redux/types/modal'
// import NotepadItem from '../Notepad/NotepadItem'
import TextareaAutosize from 'react-textarea-autosize'
import useForm from '../../../hooks/useForm'
import PlacemarkEditModal from './PlacemarkEditModal'
import TestModal from './TestModal'
// <TextareaAutosize
// tabindex='1'
// type='text'
// name='name'
// placeholder='Введите заголовок...'
// className='placemarkForm__input placemarkForm__input--title'
// value={values.name || ''}
// onChange={changeHandler}
// />
export default function Placemark({
	name,
	text,
	id,
	tags,
	bcColor,
	created,
	index,
	image,
}) {
	const dispatch = useDispatch()
	console.log(image)
	function placeMarkOpenHandler(e) {
		console.log(e.currentTarget.nextElementSibling)
		e.currentTarget.nextElementSibling.classList.toggle(
			'placemarkEditModal--visible'
		)
		placemarkModalVisible()
	}
	function placemarkModalVisible() {
		dispatch({
			type: PLACEMARK_EDIT_OPEN,
		})
	}
	function placeMarkCloseHandler(e) {
		e.currentTarget.classList.toggle('placemarkEditModal')
		dispatch({
			type: PLACEMARK_EDIT_CLOSE,
		})
	}

	function placemarkEditCloseHandler(e) {
		e.currentTarget.classList.toggle('placemarkEditable')
		dispatch({
			type: ALL_MODAL_CLOSE,
		})
	}

	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}
	const [placemarkBackground, setPlacemarkBackground] = useState({
		greyDark: true,
		grey: false,
		orange: false,
		red: false,
		green: false,
		blue: false,
		yellow: false,
	})

	const handleClose = () => {
		setOpen(false)
		let fd = new FormData()
		for (let key in values) {
			fd.append(key, values[key])
		}
		// fd.append('notepadId', notepadId)
		for (const color in placemarkBackground) {
			if (placemarkBackground[color]) {
				fd.append('bcColor', color)
			}
		}
		// dispatch(placemarkCreateSagaAC(fd))
	}
	const [values, setValues, changeHandler] = useForm()

	return (
		<>
			<li id={id}>
				<div
					className={`placemark  bc--${bcColor}`}
					id={id}
					onClick={handleOpen}
				>
					<span className='placemark__index'>{index + 1}</span>
					{image ? (
						<img
							src={process.env.REACT_APP_BASE_URL + image}
							alt=''
							className='placemark__image'
						/>
					) : (
						''
					)}
					<div className='placemark__content'>
						<h2 className='placemark__title'>{name}</h2>
						<p className='placemark__text'>{text}</p>
						<span className='placemark__created'>{created}</span>
					</div>
				</div>
				<TestModal
					placeMarkCloseHandler={placeMarkCloseHandler}
					name={name}
					text={text}
					image={image}
					id={id}
					tags={tags}
					bcColor={bcColor}
					created={created}
					index={index}
					open={open}
					handleOpen={handleOpen}
					handleClose={handleClose}
					values={values}
					setValues={setValues}
					changeHandler={changeHandler}
					placemarkBackground={placemarkBackground}
					setPlacemarkBackground={setPlacemarkBackground}
				/>
				{/* <PlacemarkEditModal
					placeMarkCloseHandler={placeMarkCloseHandler}
					name={name}
					text={text}
					id={id}
					tags={tags}
					bcColor={bcColor}
					created={created}
					index={index}
				/> */}
			</li>
		</>
	)
}
