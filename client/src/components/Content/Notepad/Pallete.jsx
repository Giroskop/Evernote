
export default function Pallete({
	placemarkBackgroundSelect,
	placemarkBackground,
	setPalleteActive,
	palleteActive,
	setPalleteIconActive,
	palleteIconActive,
}) {

	return (
		<>
			{palleteIconActive ? (
				<div
					className={`pallete ${palleteActive ? 'pallete--visible' : ''}`}
					onClick={placemarkBackgroundSelect}
					onMouseEnter={() => setPalleteActive(true)}
					onMouseLeave={() => {
						setPalleteActive(false)
						setPalleteIconActive(false)
					}}
				>
					<div
						className={`pallete__color bc--greyDark ${
							placemarkBackground.greyDark ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='greyDark'
					></div>
					<div
						className={`pallete__color bc--grey ${
							placemarkBackground.grey ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='grey'
					></div>
					<div
						className={`pallete__color bc--orange ${
							placemarkBackground.orange ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='orange'
					></div>
					<div
						className={`pallete__color bc--red ${
							placemarkBackground.red ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='red'
					></div>
					<div
						className={`pallete__color bc--green ${
							placemarkBackground.green ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='green'
					></div>
					<div
						className={`pallete__color bc--blue ${
							placemarkBackground.blue ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='blue'
					></div>
					<div
						className={`pallete__color bc--yellow ${
							placemarkBackground.yellow ? 'pallete__color--selected' : ''
						}`}
						data-placemarkbackground='yellow'
					></div>
				</div>
			) : (
				''
			)}
		</>
	)
}
