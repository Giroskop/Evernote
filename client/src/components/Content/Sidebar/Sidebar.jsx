import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import MenuItem from './MenuItem'
import { useEffect } from 'react'
import { notepadsLoadSagaAC } from '../../../redux/saga/notepadSaga'


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
	const notepads = useSelector(state => state.notepads)

	return (
		<div className='sidebar'>
			<ul className='sidebar-list'>
				<li className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<Link
							className='sidebar__subtitle-name'
							to='/'
						>
							Главная
						</Link>
					</div>
				</li>
				<li className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<Link to='/notepads' className='sidebar__subtitle-name'>
							Все блокноты
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
						{notepads.map((notepad,index) => (
							<MenuItem notepad={notepad} key={nanoid(10)}/>
						))}
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
							<Link to='/profile' className='sidebar__item-link'>
								Профиль
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}
