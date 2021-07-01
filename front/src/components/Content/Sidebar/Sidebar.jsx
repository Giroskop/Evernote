import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useLocation, Link, useHistory } from 'react-router-dom'
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
  const location = useLocation()
  const dispatch = useDispatch()
  
  
    useEffect( () => {
      dispatch(notepadsLoadSagaAC())
    }, [])
    
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
				<li className='sidebar-items'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name'>Блокноты</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						{notepads.reverse().map(item => (
							<MenuItem name={item.name} />
						))}
							{<MenuItem name={'Все блокноты'} href={'/notepads'} />}
					</ul>
				</li>
				<li className='sidebar-items'>
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
				</li>
			</ul>
		</div>
	)
}
