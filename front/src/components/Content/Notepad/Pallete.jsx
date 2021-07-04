
export default function Pallete({placemarkBackgroundSelect, placemarkBackground, setPalleteActive, palleteRef}) {

  // const h = `pallete__color pallete__color--red ${placemarkBackground[this].name ? 'pallete__color--selected' : ''}`
  console.log(palleteRef, '<<<<<<<EEEEEEEEEE')

	return (
		<div ref={palleteRef} className='pallete' onClick={placemarkBackgroundSelect} onMouseLeave={() => setPalleteActive(false)}>
			<div className={`pallete__color bc--greyDark ${placemarkBackground.greyDark ? 'pallete__color--selected' : ''}`} data-placemarkbackground="greyDark"></div>
			<div className={`pallete__color bc--grey ${placemarkBackground.grey ? 'pallete__color--selected' : ''}`} data-placemarkbackground="grey"></div>
			<div className={`pallete__color bc--orange ${placemarkBackground.orange ? 'pallete__color--selected' : ''}`} data-placemarkbackground="orange"></div>
			<div className={`pallete__color bc--red ${placemarkBackground.red ? 'pallete__color--selected' : ''}`} data-placemarkbackground="red"></div>
			<div className={`pallete__color bc--green ${placemarkBackground.green ? 'pallete__color--selected' : ''}`} data-placemarkbackground="green"></div>
			<div className={`pallete__color bc--blue ${placemarkBackground.blue ? 'pallete__color--selected' : ''}`} data-placemarkbackground="blue"></div>
			<div className={`pallete__color bc--yellow ${placemarkBackground.yellow ? 'pallete__color--selected' : ''}`} data-placemarkbackground="yellow"></div>
		</div>
	)
}
