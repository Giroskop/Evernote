import { Link } from "react-router-dom"

export default function MenuItem({title}) {
	return (
		<>
			<li className='sidebar__item'>
        <Link to="/" className='sidebar__item-link'>{title}</Link>
			</li>
		</>
	)
}
