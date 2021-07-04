import { Link } from 'react-router-dom'

export default function NotepadItem({ id, name, image, markplaces }) {
	console.log(image, 'adresss')
	return (
		<li
			className='notepadList-item notepadList-list__item'
			id={id}
			style={{
				backgroundImage: `url("${process.env.REACT_APP_BASE_URL}${image}")`,
			}}
		>
			<Link to={`/notepads/${id}`}>
				<h4 className='notepadList-item__title'>{name}</h4>
			</Link>
		</li>
	)
}
