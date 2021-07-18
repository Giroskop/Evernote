import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import Pallete from '../Notepad/Pallete'
import { PLACEMARK_FORM_OPEN } from '../../../redux/types/modal'
import { placemarkEditSagaAC } from '../../../redux/saga/placemarkSaga'
import { useParams } from 'react-router'
import useForm from '../../../hooks/useForm'
import ContentEditable from 'react-contenteditable'

export default function PlacemarkEditModal({
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

	function placemarkFormOpenHandler(e) {
		dispatch({
			type: PLACEMARK_FORM_OPEN,
		})
	}
	function placemarkFormCloseHandler(e) {
		handleClose()
	}

	const [isImageHover, setImageHover] = useState(false)

	useEffect(() => {
		console.log(placemark, 'placemark in useEffect<<')
		setValues(placemark)
	}, [])

	// useEffect(() => {
	// 	console.log(values)
  //   dispatch(placemarkEditSagaAC(values))
    
	// }, [values])

	function placemarkUpdate() {
		console.log(values)
    dispatch(placemarkEditSagaAC(values))
	}

	const [text, setText] = useState('')
	const contentEditableRef = useRef()

	function testChange(e) {
		setText(e.target.value)
	}
	function testBlur() {
		
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
					<div className={`${classes.paper} bc--${values.bcColor}`}>
						{placemark.image ? (
							<div
								className='placemark__image-wrapper'
								onMouseEnter={() => setImageHover(true)}
								onMouseLeave={() => setImageHover(false)}
							>
								<img
									src={process.env.REACT_APP_BASE_URL + values.image}
									alt=''
									className='placemark__image placemark__image--modal'
								/>
								{isImageHover ? (
									<DeleteOutlineIcon className='placemark__image-deleteIcon' />
								) : (
									''
								)}
							</div>
						) : (
							''
						)}
						<div className='placemark__content placemark__content--modal'>
							<ContentEditable
								tabIndex='1'
								className='placemark__title--modal'
								html={values.name}
								onBlur={testBlur}
								onChange={e => {
									setValues(prev => ({ ...prev, name: e.target.value }))
								}}
							/>
							<ContentEditable
								tabIndex='2'
								placeholder='Введите заголовок...'
								className='placemark__text--modal'
								html={values.text}
								onBlur={testBlur}
								onChange={e => {
									setValues(prev => ({ ...prev, text: e.target.value }))
								}}
							/>
							<div className='placemarkForm-bottom placemarkForm-bottom--modal'>
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
												image: e.target.files[0],
												test: 'lalala',
											}))
											console.log('image loaded?')
										}}
									/>
									<div
										className='placemarkForm__iconInput-label'
										onMouseEnter={() => {
											setPalleteIconActive(true)
											setPalleteActive(true)
										}}
										onMouseLeave={() => setPalleteActive(false)}
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
									onClick={placemarkUpdate}
									tabIndex='6'
								>
									Сохранить (закрыть)
								</button>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
