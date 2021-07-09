import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { useDispatch } from 'react-redux'
import { notepadCreateSagaAC } from '../../redux/saga/notepadSaga'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'

function rand() {
	return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
	const top = 50 + rand()
	const left = 50 + rand()

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

export default function PlacemarkCreateModal() {
	const classes = useStyles()
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle)

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<form className='form card__form'>
				<label className='form__label' htmlFor='bloknot-name'>
					Название блокнота
				</label>
				<input type='text' id='bloknot-name' className='form__input' />
				<button className='button form__button'>Создать</button>
			</form>
		</div>
	)
	const [isNotepadModalOpen, setIsNotepadModalOpen] = useState(false)
	const [placemarkModalOpen, setPlacemarkModalOpen] = useState(false)

	const [notepad, setNotepad] = useState({
		name: '',
		image: '',
	})
	const [placemarkName, setPlacemarkName] = useState('')
	const [errorLocal, setErrorLocal] = useState('')
	const dispatch = useDispatch()

	function notepadModalClose() {
		setNotepad({ name: '', image: '' })
		setIsNotepadModalOpen(false)
	}
	function notepadValidate() {
		if (notepad.name.length > 20) {
			setErrorLocal('Название блокнота слишком длинное')
		}
		if (notepad.name.length === 0) {
			setErrorLocal('Необходимо ввести название')
		} else {
			setErrorLocal('')
		}
	}
	function setNotepadName(e) {
		setNotepad(prev => ({
			...prev,
			name: e.target.value,
		}))
		notepadValidate()
	}
	async function notepadCreate(e) {
		e.preventDefault()
		notepadValidate()
		let fd = new FormData(e.target)
		dispatch(notepadCreateSagaAC(fd))
		setNotepad(prev => ({ name: '', image: '' }))
		setIsNotepadModalOpen(false)
	}
	async function placemarkCreate(e) {
		e.preventDefault()
		// dispatch(userPlacemarkCreateAC(placemarkName))
		setPlacemarkName('')
		setPlacemarkModalOpen(false)
	}
	console.log(notepad)

	return (
		<>
			<button
				className='button card__button'
				onClick={() => setPlacemarkModalOpen(true)}
			>
				Создать заметку
			</button>
			<Modal
				open={placemarkModalOpen}
				onClose={() => setPlacemarkModalOpen(false)}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				closeAfterTransition={true}
			>
				<div style={modalStyle} className={classes.paper}>
					<form className='form card__form'>
						<label className='form__label' htmlFor='placemark-name'>
							Название заметки
						</label>
						<input
							autoFocus
							type='text'
							id='placemark-name'
							className='form__input'
							name='placemarkTitle'
							value={placemarkName || ''}
							onChange={e => setPlacemarkName(e.target.value)}
						/>
						<button className='button form__button' onClick={placemarkCreate}>
							Создать
						</button>
					</form>
				</div>
			</Modal>
		</>
	)
}
