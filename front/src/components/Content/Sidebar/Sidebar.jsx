import NotepadList from '../Notepad/NotepadList'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

export default function Sidebar() {
	function collapse(e) {
		const items = e.target.parentElement.parentElement
		items.classList.toggle('sidebar__dropdown-collapse')
		e.target.classList.toggle('sidebar__subtitle-name--focus')
		console.log(e.target)
	}
	return (
		<div className='sidebar'>
			<div className='sidebar-container'>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle'>
						<h3 className='sidebar__subtitle-name'>Все заметки</h3>
					</div>
				</div>
				<div className='sidebar-items'>
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name'>Блокноты</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						<li className='sidebar__item'>
							<a href='' className='sidebar__item-link'>
								<span className='sidebar__item-name'>notepad name</span>
							</a>
						</li>
						<li className='sidebar__item'>
							<a href='' className='sidebar__item-link'>
								<span className='sidebar__item-name'>notepad name</span>
							</a>
						</li>
					</ul>
				</div>
				<div className='sidebar-items' >
					<div className='sidebar__subtitle' onClick={collapse}>
						<h3 className='sidebar__subtitle-name'>Настройки</h3>
						<ArrowDropDownIcon color='secondary' />
					</div>
					<ul className='sidebar__list'>
						<li className='sidebar__item'>
							<a href='' className='sidebar__item-link'>
								<span className='sidebar__item-name'>Профиль</span>
							</a>
						</li>
						<li className='sidebar__item'>
							<a href='' className='sidebar__item-link'>
								<span className='sidebar__item-name'>Выход</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
