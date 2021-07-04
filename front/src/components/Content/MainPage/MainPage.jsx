import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { useDispatch } from 'react-redux'
import { notepadCreateSagaAC } from '../../../redux/saga/notepadSaga'
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

export default function MainPage() {
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
		if (notepad.name.length == 0) {
			setErrorLocal('Необходимо ввести название')
		} else {
			setErrorLocal('')
		}
	}
	async function setNotepadName(e) {
		await setNotepad(prev => ({
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
		<div className='mainpage-wrapper'>
			<div className='mainpage-menu'>
				<ul className='mainpage-menu-list'>
					<li className='card mainpage-menu-list__item'>
						<div className='card__image-container'>
							<img
								src='./img/notepadImageDefault.webp'
								alt='notepadImage'
								className='card__image'
							/>
						</div>
						<button
							className='button card__button'
							type='button'
							onClick={() => setIsNotepadModalOpen(true)}
						>
							Создать блокнот
						</button>
						<Modal
							open={isNotepadModalOpen}
							onClose={notepadModalClose}
							aria-labelledby='simple-modal-title'
							aria-describedby='simple-modal-description'
							closeAfterTransition={true}
						>
							<div style={modalStyle} className={classes.paper}>
								<form className='form card__form' onSubmit={notepadCreate}>
									<label className='form__label' htmlFor='notepad-name'>
										Название блокнота
									</label>
									<div>{errorLocal}</div>
									<div className='notepadInputField'>
										<input
											autoFocus
											type='text'
											id='notepad-name'
											className='form__input'
											name='name'
											value={notepad.name || ''}
											onChange={setNotepadName}
										/>
										<label
											className='form__label-imageInput'
											htmlFor='notepadImage'
										>
											<InsertPhotoIcon />
										</label>
										<input
											autoFocus
											type='file'
											id='notepadImage'
											className='form__imageInput'
											name='notepadImage'
											onChange={e =>
												setNotepad(prev => ({
													...prev,
													image: e.target.files[0],
												}))
											}
										/>
									</div>
									<button className='button form__button'>Создать</button>
								</form>
							</div>
						</Modal>
					</li>
					<li className='card mainpage-menu-list__item'>
						<div className='card__image-container'>
							<img
								src='./img/zametka.jpg'
								alt='placemarkImage'
								className='card__image'
							/>
						</div>
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
									<button
										className='button form__button'
										onClick={placemarkCreate}
									>
										Создать
									</button>
								</form>
							</div>
						</Modal>
					</li>
					<li className='card mainpage-menu-list__item'>
						<div className='card__image-container'>
							<img
								src='./img/pikachu.jpeg'
								alt='pokemon photo'
								className='card__image'
							/>
						</div>
						<a href='https://japeal.com/pkm/' className='button card__button'>
							Создать покемона
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
