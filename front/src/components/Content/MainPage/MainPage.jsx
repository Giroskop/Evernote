import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { notepadCreate } from '../../../redux/actions/notepadAC'

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
	const [open1, setOpen1] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)

	const handleOpen1 = () => {
		setOpen1(true)
	}
	const handleClose1 = () => {
		setOpen1(false)
	}
	const handleOpen2 = () => {
		setOpen2(true)
	}
	const handleClose2 = () => {
		setOpen2(false)
	}

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<form className='form card__form'>
				<label className='form__label' htmlFor='bloknot-name' className='label'>
					Название блокнота
				</label>
				<input type='text' id='bloknot-name' className='form__input' />
				<button className='button form__button'>Создать</button>
			</form>
		</div>
	)
	const [values, changeHandler] = useForm()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	async function makePlacemark(e) {
		e.preventDefault()
		const res = await fetch('http://:3001/placemarks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				placemarkTitle: values.placemarkTitle,
				email: user._id,
			}),
		})
	}
	async function makeNotepad(e) {
		e.preventDefault()
		const res = await fetch('http://localhost:3001/notepads', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				notepadTitle: values.notepadTitle,
				email: user._id,
			}),
		})
		const newNotepad = await res.json()

		dispatch(notepadCreate(newNotepad))
	}

	return (
		<div className='mainpage-wrapper'>
			<div className='mainpage-menu'>
				<ul className='mainpage-menu-list'>
					<li className='card mainpage-menu-list__item'>
						<div className='card__image-container'>
							<img
								src='./img/bloknot.webp'
								alt='bloknot photo'
								className='card__image'
							/>
						</div>
						<button
							className='button card__button'
							type='button'
							onClick={handleOpen1}
						>
							Создать блокнот
						</button>
						<Modal
							open={open1}
							onClose={handleClose1}
							aria-labelledby='simple-modal-title'
							aria-describedby='simple-modal-description'
							closeAfterTransition={true}
						>
							<div style={modalStyle} className={classes.paper}>
								<form className='form card__form'>
									<label
										className='form__label'
										htmlFor='bloknot-name'
										className='label'
									>
										Название блокнота
									</label>
									<input
										type='text'
										id='bloknot-name'
										className='form__input'
										name='notepadTitle'
										value={values.notepadTitle || ''}
										onChange={changeHandler}
									/>
									<button className='button form__button' onClick={makeNotepad}>
										Создать
									</button>
								</form>
							</div>
						</Modal>
					</li>
					<li className='card mainpage-menu-list__item'>
						<div className='card__image-container'>
							<img
								src='./img/zametka.jpg'
								alt='zametka photo'
								className='card__image'
							/>
						</div>
						<button className='button card__button' onClick={handleOpen2}>
							Создать заметку
						</button>
						<Modal
							open={open2}
							onClose={handleClose2}
							aria-labelledby='simple-modal-title'
							aria-describedby='simple-modal-description'
							closeAfterTransition={true}
						>
							<div style={modalStyle} className={classes.paper}>
								<form className='form card__form'>
									<label
										className='form__label'
										htmlFor='bloknot-name'
										className='label'
									>
										Название заметки
									</label>
									<input
										type='text'
										id='bloknot-name'
										className='form__input'
										name='placemarkTitle'
										value={values.placemarkTitle || ''}
										onChange={changeHandler}
									/>
									<button
										className='button form__button'
										onClick={makePlacemark}
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
