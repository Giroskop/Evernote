import { Link } from "react-router-dom"

export default function MenuItem({name, id}) {
	return (
		<>
			<li className='sidebar__item'>
        <Link to={`notepads/${id}`} className='sidebar__item-link'>{name}</Link>
			</li>
		</>
	)
}
