import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useDispatch } from 'react-redux'
import useForm from '../../../hooks/useForm'

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import Pallete from '../Notepad/Pallete'
import {
	ALL_MODAL_CLOSE,
	PLACEMARK_FORM_OPEN,
} from '../../../redux/types/modal'

export default function TestModal({
	name,
	text,
	id,
	tags,
	bcColor,
	created,
	index,
	image,
	open,
	handleOpen,
	handleClose,
	values,
	setValues,
	changeHandler,
	placemarkBackground,
	setPlacemarkBackground,
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
			padding: '10px',
			width: '400px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	}))
	const classes = useStyles()
	const dispatch = useDispatch()

	const [palleteActive, setPalleteActive] = useState(false)
	const [palleteIconActive, setPalleteIconActive] = useState(false)

	function placemarkFormOpenHandler(e) {
		dispatch({
			type: PLACEMARK_FORM_OPEN,
		})
	}
	function placemarkFormCloseHandler(e) {
		handleClose()
	}

	function placemarkBackgroundSelect(e) {
		if (e.target.classList.contains('pallete__color')) {
			setPlacemarkBackground(prev => ({
				greyDark: false,
				grey: false,
				orange: false,
				red: false,
				green: false,
				blue: false,
				yellow: false,
				[e.target.dataset.placemarkbackground]: true,
			}))
		}
	}
	function backgroundSelected() {
		for (let color in placemarkBackground) {
			if (placemarkBackground[color]) return color
		}
	}

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={`${classes.paper} bc--${backgroundSelected()}`}>
						{image ? (
							<img
								src={process.env.REACT_APP_BASE_URL + image}
								alt=''
								className='placemark__image placemark__image--modal'
							/>
						) : (
							''
						)}
						<h2
							id='transition-modal-title'
							className=' placemark__title--modal'
							contentEditable={true}
							value={values.name || ''}
							onChange={changeHandler}
						>
							{name} 123
						</h2>
						<p
							id='transition-modal-description'
							className=' placemark__text--modal'
							contentEditable={true}
							value={values.text || ''}
							onChange={changeHandler}
						>
							{text}
						</p>
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
									onMouseLeave={() => setPalleteActive(false)}
								>
									<PaletteIcon
										className='placemarkForm__iconInput-icon'
										height={'50px'}
										tabIndex='4'
									/>
									<Pallete
										placemarkBackgroundSelect={placemarkBackgroundSelect}
										placemarkBackground={placemarkBackground}
										setPalleteActive={setPalleteActive}
										palleteActive={palleteActive}
										setPalleteIconActive={setPalleteIconActive}
										palleteIconActive={palleteIconActive}
									/>
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
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
