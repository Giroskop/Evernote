import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { pathChange } from '../../../redux/actions/pathAC'
import NotepadItem from './NotepadItem'

export default function NotepadList() {
	const notepadArray = [
		{
			id: 1,
			title: 'Что купить',
			placemarks: [
				{ id: 1, title: 'купить чай' },
				{ id: 2, title: 'помыть пол' },
			],
		},
		{
			id: 2,
			title: 'Что сделать',
			placemarks: [
				{ id: 1, title: 'выучить все хуки' },
				{ id: 2, title: 'найти кайф-работу в 140к' },
			],
		},
	]
	const dispatch = useDispatch()

  
	useEffect(() => {
		dispatch(pathChange('/placemarks'))
	}, [])

	const notepads = useSelector(state => state.notepads)
  console.log(notepads)
	return (
		<div className='notepad-wrapper'>
			<h3 className='notepad-title'>Блокноты</h3>
			<ul className='notepad-list'>
				{notepads.map(item => (
					<NotepadItem id={item.id} name={item.name} created={item.created} markplaces={item.markplaces}/>
				))}
			</ul>
		</div>
	)
}
