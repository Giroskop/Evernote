import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import useForm from '../../../hooks/useForm'
import TextareaAutosize from 'react-textarea-autosize'
import Pallete from '../Notepad/Pallete'

import {
	ALL_MODAL_CLOSE,
	PLACEMARK_FORM_OPEN,
} from '../../../redux/types/modal'
import { placemarkCreateSagaAC } from '../../../redux/saga/placemarkSaga'
export default function PlacemarkForm() {
	const dispatch = useDispatch()
	const notepadId = useParams().id
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
			fd.append('notepadId', notepadId)

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

	return (
		<>
			<form
				className={`
      placemarkForm ${
				placemarkFormActive ? 'placemarkForm placemarkForm--collapse' : ''
			} bc--${backgroundSelected()}
      `}
				onSubmit={placemarkCreate}
			>
				<div
					className={
						placemarkFormActive
							? 'placemarkForm__input-wrapper placemarkForm__input-wrapper--collapse'
							: 'placemarkForm__input-wrapper'
					}
					onClick={placemarkFormOpenHandler}
				>
					<TextareaAutosize
						tabIndex='2'
						type='text'
						name='text'
						placeholder='Заметка...'
						className='placemarkForm__input placemarkForm__input--text'
						value={values.text || ''}
						onChange={changeHandler}
					/>
					<TextareaAutosize
						tabIndex='1'
						type='text'
						name='name'
						placeholder='Введите заголовок...'
						className='placemarkForm__input placemarkForm__input--title'
						value={values.name || ''}
						onChange={changeHandler}
					/>
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
							{palleteIconActive ? 
              <Pallete
              placemarkBackgroundSelect={placemarkBackgroundSelect}
              placemarkBackground={placemarkBackground}
              setPalleteActive={setPalleteActive}
              palleteActive={palleteActive}
              setPalleteIconActive={setPalleteIconActive}
              palleteIconActive={palleteIconActive}
            /> : ''}
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
			</form>
		</>
	)
}
