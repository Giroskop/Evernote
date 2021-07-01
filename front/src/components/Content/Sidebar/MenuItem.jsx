import { Link } from "react-router-dom"

export default function MenuItem({name, href}) {
	return (
		<>
			<li className='sidebar__item'>
        <Link to={href} className='sidebar__item-link'>{name}</Link>
			</li>
		</>
	)
}
