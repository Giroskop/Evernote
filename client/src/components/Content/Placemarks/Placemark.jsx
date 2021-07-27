import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ALL_MODAL_CLOSE,
	PLACEMARK_EDIT_CLOSE,
	PLACEMARK_EDIT_OPEN,
} from '../../../redux/types/modal'
// import NotepadItem from '../Notepad/NotepadItem'
import useForm from '../../../hooks/useForm'
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
	setPlacemarkEditModalOpen,
  setPlacemark
}) {
	const dispatch = useDispatch()
	function placeMarkOpenHandler(e) {
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
		setPlacemarkEditModalOpen(false)
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

  const placemarkList = useSelector(state => state.placemarks)

	function modalOpen(e) {
		const placemarkId = e.currentTarget.id
    const placemark = placemarkList.find(item => item._id === placemarkId)
    setPlacemark(placemark)
		setPlacemarkEditModalOpen(true)
	}
  console.log(image)
	return (
		<>
			<li id={id} onClick={modalOpen}>
				<div
					className={`placemark  bc--${bcColor}`}
					id={id}
					onClick={handleOpen}
				>
					{image && image !== 'null' ? (
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
				{/* <PlacemarkEditModal
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
				/> */}
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
