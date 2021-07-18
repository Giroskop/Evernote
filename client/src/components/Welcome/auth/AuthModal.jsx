import React from 'react'
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

export default function AuthModal({ authModalOpen,setAuthModalOpen, authModalName, setAuthModalName }) {
	const classes = useStyles()
	const dispatch = useDispatch()

	const handleClose = () => {
		setAuthModalOpen(false)
		dispatch(clearErrorAC())
	}
	const toggleModal = () => {
    if (authModalName === 'Зарегистрироваться') {
      setAuthModalName('Войти')
    } else {
      setAuthModalName('Зарегистрироваться')
    }
	}

	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={authModalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={authModalOpen}>
					<div className={classes.paper}>
						{authModalName === 'Зарегистрироваться' ? (
							<SignUp toggleModal={toggleModal} setAuthModalOpen={setAuthModalOpen}/>
						) : (
							<SignIn toggleModal={toggleModal} setAuthModalOpen={setAuthModalOpen}/>
						)}
					</div>
				</Fade>
			</Modal>
		</>
	)
}
