import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from './MenuItem'
import { useEffect } from 'react'
import { notepadsLoadSagaAC } from '../../../redux/saga/notepadSaga'
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
	const dispatch = useDispatch()
  console.log('render sidbar')
	useEffect(() => {
		dispatch(notepadsLoadSagaAC())
	}, [])

	function collapse(e) {
		const items = e.target.parentElement.parentElement
		items.classList.toggle('sidebar__dropdown-collapse')
		e.target.classList.toggle('sidebar__subtitle-name--focus')
	}
	const path = useSelector(state => state.path)
	const notepads = useSelector(state => state.notepads)

	return (
		<div className='sidebar'>
			<ul className='sidebar-list'>
				<li className='sidebar-items'>
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
				</li>
				<li className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<Link className='sidebar__subtitle-name' to='/placemarks'>
							Все заметки
						</Link>
					</div>
				</li>
				<li className='sidebar-items sidebar__dropdown-collapse'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name sidebar__subtitle-name--focus'>
							Блокноты
						</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						{notepads.map((item,index) => (
							<MenuItem name={item.name} id={item._id} key={() => Math.random()}/>
						))}
						<li className='sidebar__item'>
							<Link to='/notepads' className='sidebar__item-link'>
								Все блокноты
							</Link>
						</li>
					</ul>
				</li>
				<li className='sidebar-items sidebar__dropdown-collapse'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name sidebar__subtitle-name--focus'>
							Настройки
						</h3>
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
				</li>
			</ul>
		</div>
	)
}
