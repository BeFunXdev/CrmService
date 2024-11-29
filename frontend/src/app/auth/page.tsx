import LoginForm from '@/components/LoginForm/LoginForm'

import styles from './_page.module.scss'
import RegisterForm from '@/app/auth/registerForm'

const AuthPage = () => {
	return (
		<div className={styles.layout}>
			{/* <LoginForm /> */}
			<RegisterForm />
		</div>
	)
}

export default AuthPage
