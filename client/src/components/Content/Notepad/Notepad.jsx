import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Placemark from './Placemark'
import PlacemarkForm from './PlacemarkForm'
import { placemarksLoadSagaAC } from '../../../redux/saga/placemarkSaga'
export default function Notepad() {
  
  const dispatch = useDispatch()
	const notepadId = useParams().id
	const notepad = useSelector(state =>
		state.notepads.find(item => item._id === notepadId)
	)
  useEffect( () => {
    dispatch(placemarksLoadSagaAC(notepadId))
  },[])

	const [isEditable, setEditable] = useState(false)
	const { innerWidth: width, innerHeight: height } = window
  const {backLayoutActive} = useSelector(state => state.modals)
  const placemarks = useSelector(state => state.placemarks)

	return (
		<>
			{notepad ? (
				<>
					<div className='notepad'>
						<h1 className='notepad__title'>{notepad.name}</h1>
						<PlacemarkForm />
						<ul className='placemarks'>
              {placemarks.map((item, index) => <Placemark isEditable={isEditable} setEditable={setEditable} name={item.name} text={item.text} id={item._id} tags={item.tags} bcColor={item.bcColor} created={item.created} index={index}/>)}
							<Placemark />
						</ul>
						<div className={isEditable ? 'placemarkCloseArea' : ''}></div>
					</div>
				</>
			) : null}
		</>
	)
}
