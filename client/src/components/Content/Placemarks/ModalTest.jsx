import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentEditable from 'react-contenteditable'
import TextareaAutosize from 'react-textarea-autosize'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import Pallete from '../Notepad/Pallete'
import useForm from '../../../hooks/useForm'
import {
	ALL_MODAL_CLOSE,
	PLACEMARK_FORM_OPEN,
} from '../../../redux/types/modal'
import { placemarkCreateSagaAC } from '../../../redux/saga/placemarkSaga'

export default function ModalTest({
	name,
	id,
	tags,
	bcColor,
	created,
	index,
	image,
	open,
	handleOpen,
	handleClose,
	placemark,
	placemarkEditModalOpen,
	setPlacemarkEditModalOpen,
}) {
	const useStyles = makeStyles(theme => ({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			color: 'white',
		},
		paper: {
			backgroundColor: 'none',
			border: 'none',
			borderRadius: '5px',
			boxShadow: 'none',
			width: '400px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	}))
	const classes = useStyles()
	const dispatch = useDispatch()

	const [values, setValues, changeHandler] = useForm()

	const [palleteActive, setPalleteActive] = useState(false)
	const [palleteIconActive, setPalleteIconActive] = useState(false)

	const placemarkBackgroundInitial = {
		greyDark: true,
		grey: false,
		orange: false,
		red: false,
		green: false,
		blue: false,
		yellow: false,
	}

	const [placemarkBackground, setPlacemarkBackground] = useState(
		placemarkBackgroundInitial
	)

	function placemarkBackgroundSelect(e) {
		if (e.target.classList.contains('pallete__color')) {
			setPlacemarkBackground({
				...placemarkBackgroundInitial,
				greyDark: false,
				[e.target.dataset.placemarkbackground]: true,
			})
		}
	}
	function backgroundSelected() {
		for (let color in placemarkBackground) {
			if (placemarkBackground[color]) return color
		}
	}
	const { placemarkFormActive, backLayoutActive } = useSelector(
		state => state.modals
	)
	const error = useSelector(state => state.error)
	function placemarkFormOpenHandler(e) {
		dispatch({
			type: PLACEMARK_FORM_OPEN,
		})
	}
	function placemarkFormCloseHandler(e) {
		dispatch({
			type: ALL_MODAL_CLOSE,
		})
	}

	function placemarkCreate(e) {
		e.preventDefault()
		if (setValues.text || setValues.name) {
			let fd = new FormData()

			for (let key in values) {
				fd.append(key, values[key])
			}

			for (const color in placemarkBackground) {
				if (placemarkBackground[color]) {
					fd.append('bcColor', color)
				}
			}
			dispatch(placemarkCreateSagaAC(fd))
			if (!error.message) {
				console.log('ошибки не было, values clear')
				setPlacemarkBackground(placemarkBackgroundInitial)
				setValues({})
			}
		} else {
			console.log('какие-то поля не заполнены (плейсмарк)')
		}
	}

	const [text, setText] = useState('')
	const contentEditableRef = useRef()
  
  function testChange(e) {
    setText(e.target.value)
  }
	function testBlur() {
		console.log(contentEditableRef.current.innerHTML) // Correct value
		console.log(text) // Incorrect value
	}


	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={placemarkEditModalOpen}
				onClose={() => setPlacemarkEditModalOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={placemarkEditModalOpen}>
						<div>
							{/* <ContentEditable
								tabIndex='1'
								className=''
								value={values.text || ''}
								innerRef={contentEditableRef}
								html={text}
								onBlur={testBlur}
								onChange={testChange}
							/>
							<ContentEditable
								tabIndex='2'
								placeholder='Введите заголовок...'
								className=''
								innerRef={contentEditableRef}
								html={text}
								onBlur={testBlur}
								onChange={testChange}
							/> */}
            </div>
						<div className='placemarkForm-bottom'>
							<div className='placemarkForm-options'>
								<label
									className='placemarkForm__iconInput-label'
									htmlFor='placemarkImage'
									title='Добавить фото'
								>
									<InsertPhotoIcon
										className='placemarkForm__iconInput-icon'
										height={'50px'}
										tabIndex='3'
									/>
								</label>
								<input
									autoFocus
									type='file'
									id='placemarkImage'
									className='placemarkForm__iconInput'
									name='image'
									onChange={e => {
										setValues(prev => ({
											...prev,
											placemarkImage: e.target.files[0],
										}))
									}}
								/>
								<div
									className='placemarkForm__iconInput-label'
									onMouseEnter={() => {
										setPalleteIconActive(true)
										setPalleteActive(true)
									}}
									onMouseLeave={() => setPalleteIconActive(false)}
								>
									<PaletteIcon
										className='placemarkForm__iconInput-icon'
										height={'50px'}
										tabIndex='4'
									/>
									{palleteIconActive ? (
										<Pallete
											placemarkBackgroundSelect={placemarkBackgroundSelect}
											placemarkBackground={placemarkBackground}
											setPalleteActive={setPalleteActive}
											palleteActive={palleteActive}
											setPalleteIconActive={setPalleteIconActive}
											palleteIconActive={palleteIconActive}
										/>
									) : (
										''
									)}
								</div>
							</div>
							<button
								className='button placemarkForm__buttonClose'
								onClick={placemarkFormCloseHandler}
								tabIndex='6'
							>
								Сохранить (закрыть)
							</button>
						</div>
				</Fade>
			</Modal>
		</div>
	)
}
