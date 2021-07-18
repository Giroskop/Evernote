import { nanoid } from 'nanoid'
import { useState } from 'react'
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Placemark from '../Placemarks/Placemark'
import ModalTest from './ModalTest'
import PlacemarkEditModal from './PlacemarkEditModal'

export default function PlacemarkList() {
	const [placemarkEditModalOpen, setPlacemarkEditModalOpen] = useState(false)
	const [placemark, setPlacemark] = useState({})

  const notepadId = useParams().id
	const notepad = useSelector(state =>
		state.notepads.find(item => item._id === notepadId)
	)

	const placemarks = useSelector(state => state.placemarks).filter(
		item => item.notepad === notepadId
	)

	return (
		<>
			<ul className='placemarks'>
				{placemarks.map((item, index) => (
					<Placemark
						name={item.name}
						text={item.text}
						image={item.image}
						id={item._id}
						tags={item.tags}
						bcColor={item.bcColor}
						created={item.created}
						index={index}
						key={nanoid(10)}
						setPlacemarkEditModalOpen={setPlacemarkEditModalOpen}
						setPlacemark={setPlacemark}
					/>
				))}
			</ul>
			{placemarkEditModalOpen ? (
				<Portal>
					<PlacemarkEditModal
						placemark={placemark}
						placemarkEditModalOpen={placemarkEditModalOpen}
						setPlacemarkEditModalOpen={setPlacemarkEditModalOpen}
					/>
				</Portal>
			) : (
				''
			)}
		</>
	)
}
