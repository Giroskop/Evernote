import { useState } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import Placemark from '../Placemarks/Placemark'

export default function PlacemarkList({ placemarks }) {


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
					/>
				))}
			</ul>
		</>
	)
}
