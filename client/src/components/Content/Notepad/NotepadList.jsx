import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotepadItem from './NotepadItem'
import { nanoid } from 'nanoid'
export default function NotepadList() {
	const dispatch = useDispatch()

	const notepads = useSelector(state => state.notepads)

	return (
		<div className='notepadList-wrapper'>
			<h3 className='notepadList-title'>Блокноты</h3>
			<ul className='notepadList-list'>
				{notepads.map(item => (
					<NotepadItem
						id={item._id}
						name={item.name}
						image={item.image}
            key={nanoid(10)}
					/>
				))}
			</ul>
		</div>
	)
}
