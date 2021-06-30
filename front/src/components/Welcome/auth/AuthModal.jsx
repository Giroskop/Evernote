import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SignUp from './SignUp'
import SignIn from './SignIn'
import { useDispatch } from 'react-redux'
import { clearErrorAC } from '../../../redux/actions/errorAC'
const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

export default function AuthModal({ modalButtonName }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const [modalName, setModalName] = useState('Зарегистрироваться')
	const dispatch = useDispatch()

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		dispatch(clearErrorAC())
	}
	const toggleModal = () => {
    // setOpen(false)
    // if (modalName === 'Зарегистрироваться') {
    //   setModalName('Войти')
    // } else {
    //   setModalName('Зарегистрироваться')
    // }
    // setOpen(true)
	}

	return (
		<div>
			<button type='button' className='button auth-link' onClick={handleOpen}>
				{modalButtonName}
			</button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{modalButtonName === 'Зарегистрироваться' ? (
							<SignUp toggleModal={toggleModal} />
						) : (
							<SignIn toggleModal={toggleModal} />
						)}
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
