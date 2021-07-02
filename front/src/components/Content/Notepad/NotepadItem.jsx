export default function NotepadItem({id, name, markplaces}) {

  return (
    <li className="notepad-item notepad-list__item" id={id}>
      <h4 className="notepad-item__title">
        {name}
      </h4>
    </li>
  )
}
