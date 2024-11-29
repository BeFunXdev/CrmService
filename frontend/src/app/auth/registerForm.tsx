'use client'

import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import LoginForm from '@/components/LoginForm/LoginForm'
import { Field } from '@/components/ui/Filds'

import { PagesUrl } from '@/constants/pageUrl'

import { IAuthRegisterForm } from '@/types/authTypes'

import { authService } from '@/services/authService'

const RegisterForm = () => {
	const { register, handleSubmit, reset } = useForm<IAuthRegisterForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(true)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthRegisterForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfulle login!')
			reset()
			push(PagesUrl.HOME)
		},
		onError() {
			toast.error('Error login')
		}
	})

	const onSubmit: SubmitHandler<IAuthRegisterForm> = data => {
		mutate(data)
	}

	return (
		<>
			{isLoginForm ? (
				<div>
					<p style={{ backgroundColor: 'tomato' }}>Login form</p>
					<form
						action=''
						onSubmit={handleSubmit(onSubmit)}
					>
						<Field
							id='name'
							placeholder='Enter yuor name'
							type='text'
							{...register('name', {
								required: 'Name is required!'
							})}
						/>

						<Field
							id='email'
							placeholder='Enter yuor email'
							type='email'
							{...register('email', {
								required: 'Email is required!'
							})}
						/>

						<Field
							id='password'
							placeholder='Enter yuor password'
							type='password'
							{...register('password', {
								required: 'password is required!'
							})}
						/>

						<div>
							<Button type={'submit'}>Sign Up</Button>
						</div>
					</form>
					<Button
						type={'button'}
						onClick={() => setIsLoginForm(false)}
					>
						REGISTER FORM
					</Button>
				</div>
			) : (
				<LoginForm
					setIsLoginForm={setIsLoginForm}
					loginForm={isLoginForm}
				/>
			)}
		</>
	)
}

export default RegisterForm
