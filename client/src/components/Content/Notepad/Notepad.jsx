import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PlacemarkForm from '../Placemarks/PlacemarkForm'
import PlacemarkList from '../Placemarks/PlacemarkList'
import PageNotExist from '../../Errors/Error'
import BackLayout from '../../BackLayout/BackLayout'
import { ALL_MODAL_CLOSE } from '../../../redux/types/modal'

export default function Notepad() {
  const dispatch = useDispatch()
	const notepadId = useParams().id
	const notepad = useSelector(state =>
		state.notepads.find(item => item._id === notepadId)
	)

	const placemarks = useSelector(state => state.placemarks).filter(
		item => item.notepad === notepadId
	)
  const { placemarkFormActive, backLayoutActive } = useSelector(
		state => state.modals
	)
  function anyModalClose() {
    dispatch({
      type: ALL_MODAL_CLOSE
    })
  }
  console.log('notepad render')
	return (
		<>
			{notepad ? (
				<>
					<div className='notepad'>
						{backLayoutActive ? (
							<BackLayout
              anyModalClose={anyModalClose}
							/>
						) : null}
						<h1 className='notepad__title'>{notepad.name}</h1>
						<PlacemarkForm />
						<PlacemarkList placemarks={placemarks} />
					</div>
				</>
			) : (
				<PageNotExist />
			)}
		</>
	)
}
