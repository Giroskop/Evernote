export default function NotepadItem({id, title}) {

  return (
    <li className="notepad-item notepad-list__item" id={id}>
      <h4 className="notepad-item__title">
        {title}
      </h4>
    </li>
  )
}
