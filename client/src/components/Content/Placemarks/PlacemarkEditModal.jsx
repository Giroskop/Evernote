import React from 'react'

import { useDispatch, useSelector } from 'react-redux'


export default function TransitionsModal({
	name,
	text,
	id,
	tags,
	bcColor,
	created,
	index,
	image,
  placeMarkCloseHandler
}) {


	const dispatch = useDispatch()


	const placemarkEditActive = useSelector(
		state => state.modals.placemarkEditActive
	)

	return (
		<div className={`placemarkEditModal`} onClick={placeMarkCloseHandler}>
			<div className={`placemark placemark--modal bc--${bcColor}`} id={id}>
				<span className='placemark__index'>{index + 1}</span>
				{image ? (
					<img
						src={process.env.REACT_APP_BASE_URL + image}
						alt=''
						className='placemark__image'
					/>
				) : (
					''
				)}
				<div className='placemark__content placemark__content--modal'>
					<h2
						className='placemark__title'
						contentEditable={true}
					>
						{name}
					</h2>
					<p className='placemark__text placemark__text--modal' contentEditable={true}>
						{text}
					</p>
					<span className='placemark__created'>{created}</span>
				</div>
			</div>
		</div>
	)
}
