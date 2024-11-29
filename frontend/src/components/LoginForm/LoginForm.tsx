'use client'

import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Field } from '@/components/ui/Filds'

import { IAuthRegisterForm } from '@/types/authTypes'

// import { PagesUrl } from '@/constants/pageUrl'
import { authService } from '@/services/authService'

const LoginForm = ({ loginForm, setIsLoginForm }) => {
	// console.log(loginForm)

	const { register, handleSubmit, reset } = useForm<IAuthRegisterForm>({
		mode: 'onChange'
	})

	// const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthRegisterForm) =>
			authService.main(loginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfulle REG!')
			setIsLoginForm(true)
			reset()
		},
		onError() {
			toast.error('Error REG')
		}
	})

	const onSubmit: SubmitHandler<IAuthRegisterForm> = data => {
		mutate(data)
	}

	return (
		<div>
			<p style={{ backgroundColor: '#14ccdd' }}>Register form</p>
			<form
				action=''
				onSubmit={handleSubmit(onSubmit)}
			>
				<label id='name'>
					<span>Your name:</span>
					<Field
						id='name'
						placeholder='Enter your name'
						type='text'
						{...register('name', {
							required: 'Name is required!',
							minLength: 1
						})}
					/>
				</label>

				<label id='email'>
					<span>Your email:</span>
					<Field
						id='email'
						placeholder='Enter your email'
						type='email'
						{...register('email', {
							required: 'email is required!'
						})}
					/>
				</label>

				<label id='password'>
					<span>Your password:</span>
					<Field
						id='password'
						placeholder='Enter your password'
						type='password'
						{...register('password', {
							required: 'password is required!'
						})}
					/>
				</label>

				<Button type={'submit'}>Reg</Button>
			</form>
			<Button
				onClick={() => setIsLoginForm(true)}
				type='click'
			>
				LOGIN FORM
			</Button>
		</div>
	)
}

export default LoginForm
