import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import { pathChange } from '../../../redux/actions/pathAC'
import NotepadItem from './NotepadItem'
import useForm from '../../../hooks/useForm'
export default function PlacemarkForm({ setEditable, isEditable }) {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(pathChange('/placemarks'))
	// }, [])
	// const notepads = useSelector(state => state.notepads)

	const [isActive, setActive] = useState(false)
	const [values, setValues, changeHandler] = useForm()

	console.log(isActive, 'FORM')
	console.log(values)
	return (
    <form
    action=''
    className={
      isActive ? 'placemarkForm placemarkForm--collapse' : 'placemarkForm'
    }
		>

			<div
				className={
					isActive
						? 'placemarkForm__input-wrapper placemarkForm__input-wrapper--collapse'
						: 'placemarkForm__input-wrapper'
				}
				onClick={() => setActive(true)}
			>
				<input
					type='text'
					name='placemarkText'
					placeholder='Заметка...'
					className='placemarkForm__input placemarkForm__input--text'
					onChange={changeHandler}
				/>
				<input
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
					<label
						className='placemarkForm__iconInput-label'
						htmlFor='placemarkBackground'
						title='Добавить фото'
					>
						<PaletteIcon
							className='placemarkForm__iconInput-icon'
							height={'50px'}
						/>
					</label>
					<input
						autoFocus
						type='file'
						id='placemarkBackground'
						className='placemarkForm__iconInput'
						name='placemarkBackground'
						onChange={changeHandler}
					/>
				</div>
        <button className="button placemarkForm__buttonClose">Закрыть</button>
			</div>
		</form>
	)
}
