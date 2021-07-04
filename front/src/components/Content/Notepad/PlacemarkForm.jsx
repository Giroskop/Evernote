import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import { pathChange } from '../../../redux/actions/pathAC'
import NotepadItem from './NotepadItem'
import useForm from '../../../hooks/useForm'
import TextareaAutosize from 'react-textarea-autosize'
import Pallete from './Pallete'
import { Portal } from 'react-portal'
import useHover from '../../../hooks/useHover'
export default function PlacemarkForm({ setEditable, isEditable }) {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(pathChange('/placemarks'))
	// }, [])
	// const notepads = useSelector(state => state.notepads)

	const [isActive, setActive] = useState(false)
	const [values, setValues, changeHandler] = useForm()
	const [palleteActive, setPalleteActive] = useState(false)

	function isPalleteHandler() {
		if (palleteActive) setPalleteActive(false)
		else setPalleteActive(true)
	}

	function placemarkCreate(e) {
		e.preventDefault()
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
  const palleteRef = useRef()
  console.log(palleteRef, 'yjjjjjjjjjjjjj')
  const isHovering = useHover(palleteRef)
  console.log(isHovering, 'CUSTOM HOVER')

  const palleteIconRef = useRef()

	return (
		<form
			className={`
      placemarkForm ${
				isActive ? 'placemarkForm placemarkForm--collapse' : ''
			} bc--${backgroundSelected()}
      `}
			onSubmit={placemarkCreate}
		>
			<div
				className={
					isActive
						? 'placemarkForm__input-wrapper placemarkForm__input-wrapper--collapse'
						: 'placemarkForm__input-wrapper'
				}
				onClick={() => setActive(true)}
			>
				<TextareaAutosize
					type='text'
					name='placemarkText'
					placeholder='Заметка...'
					className='placemarkForm__input placemarkForm__input--text'
					onChange={changeHandler}
				/>
				<TextareaAutosize
					type='text'
					name='placemarkTitle'
					placeholder='Введите заголовок...'
					className='placemarkForm__input placemarkForm__input--title'
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
						/>
					</label>
					<input
						autoFocus
						type='file'
						id='placemarkImage'
						className='placemarkForm__iconInput'
						name='placemarkImage'
						onChange={changeHandler}
					/>
					<div
						className='placemarkForm__iconInput-label'
						onMouseEnter={isPalleteHandler}
					>
						<PaletteIcon
							className='placemarkForm__iconInput-icon'
							height={'50px'}
						/>
						<Pallete
							placemarkBackgroundSelect={placemarkBackgroundSelect}
							placemarkBackground={placemarkBackground}
							setPalleteActive={setPalleteActive}
              palleteRef={palleteRef}
						/>
					</div>
				</div>
				<button
					className='button placemarkForm__buttonClose'
					onClick={() => setActive(false)}
				>
					Закрыть
				</button>
			</div>
		</form>
	)
}
