import NotepadList from '../Notepad/NotepadList'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { pathChange } from '../../../redux/actions/pathAC'
import MenuItem from './MenuItem'
import { getUserInfoThunk } from '../../../redux/actions/userAC'
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

export default function Sidebar() {
	const location = useLocation()

	function collapse(e) {
		const items = e.target.parentElement.parentElement
		items.classList.toggle('sidebar__dropdown-collapse')
		e.target.classList.toggle('sidebar__subtitle-name--focus')
	}

	function focus(e) {
		e.target.classList.toggle('sidebar__subtitle-name--focus')
	}

/* 	const dispatch = useDispatch()
	useEffect(async () => {
		getUserInfoThunk()
	}, [])!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
	const path = useSelector(state => state.path)
	const notepads = useSelector(state => state.user.notepads)

	return (
		<div className='sidebar'>
			<div className='sidebar-container'>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<Link
							className={
								path === '/'
									? 'sidebar__subtitle-name sidebar__subtitle-name--focus'
									: 'sidebar__subtitle-name'
							}
							to='/'
						>
							Главная
						</Link>
					</div>
				</div>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<Link className='sidebar__subtitle-name' to='/placemarks'>
							Все заметки
						</Link>
					</div>
				</div>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name'>Блокноты</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						{notepads.map(item => (
							<MenuItem title={item.title} />
						))}
						<Link to='/notepads'>
							<MenuItem title={'Все блокноты'} />
						</Link>
					</ul>
				</div>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name'>Настройки</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						<li className='sidebar__item'>
							<Link to='/settings' className='sidebar__item-link'>
								Профиль
							</Link>
						</li>
						<li className='sidebar__item'>
							<Link to='/1123' className='sidebar__item-link'>
								Выход
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
