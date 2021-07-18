import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { useDispatch } from 'react-redux'
import { notepadCreateSagaAC } from '../../redux/saga/notepadSaga'


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

export default function NotepadCreateModal() {
	const classes = useStyles()
  const dispatch = useDispatch()
	const [modalStyle] = React.useState(getModalStyle)

	const [isNotepadModalOpen, setIsNotepadModalOpen] = useState(false)
	const [notepad, setNotepad] = useState({
		name: '',
		image: '',
	})
	const [errorLocal, setErrorLocal] = useState('')
  
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

	return (
		<>
			<button
				className='button card__button createNotepadButton'
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
						</div>
						<button className='button form__button'>Создать</button>
					</form>
				</div>
			</Modal>
		</>
	)
}
