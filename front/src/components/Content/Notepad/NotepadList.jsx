import NotepadItem from './NotepadItem'


export default function NotepadList() {
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
	return (
		<div className='notepad-wrapper'>
      <h3 className="notepad-title">notepads</h3>
			<ul className='notepad-list'>
				{notepadArray.map(item => <NotepadItem id={item.id} title={item.title}/>)}
			</ul>
		</div>
	)
}
