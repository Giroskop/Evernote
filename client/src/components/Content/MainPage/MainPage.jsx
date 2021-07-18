import React from 'react'
import {  useSelector } from 'react-redux'
import PlacemarkList from '../Placemarks/PlacemarkList'

export default function MainPage() {

	const placemarks = useSelector(state => state.placemarks).slice(0, 12)

	return (
		<div className='mainpage-wrapper'>
			<h1 className='title'>Ваши последние заметки</h1>
			<div className='mainpage-menu'>
				<PlacemarkList placemarks={placemarks}/>
			</div>
		</div>
	)
}
