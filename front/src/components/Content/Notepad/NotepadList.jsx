import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { pathChange } from '../../../redux/actions/pathAC'
import NotepadItem from './NotepadItem'

export default function NotepadList() {
	const dispatch = useDispatch()

  
	useEffect(() => {
		dispatch(pathChange('/placemarks'))
	}, [])

	const notepads = useSelector(state => state.notepads)

	return (
		<div className='notepadList-wrapper'>
			<h3 className='notepadList-title'>Блокноты</h3>
			<ul className='notepadList-list'>
				{notepads.map(item => (
					<NotepadItem id={item._id} name={item.name} image={item.image} created={item.created} markplaces={item.markplaces}/>
				))}
			</ul>
		</div>
	)
}
