'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthRegisterForm} from "@/types/authTypes";
import {useState} from "react";
import { Button } from '@mui/material';
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/authService";
import {toast} from "sonner";
import {PagesUrl} from "@/constants/pageUrl";
import {Field} from "@/components/ui/Filds";

const RegisterForm = () => {

    const {register, handleSubmit, reset} = useForm<IAuthRegisterForm>({
        mode: "onChange"
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const {push} = useRouter()

    const {mutate} = useMutation({
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
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Field
                    id="name"
                    // label="Yuor name"
                    placeholder="Enter yuor name"
                    type='text'
                    {
                    ...register('name', {
                        required: 'Name is required!'
                    })
                    }/>

                <Field
                    id="email"
                    // label="Yuor email"
                    placeholder="Enter yuor email"
                    type='email'
                    {
                        ...register('email', {
                            required: 'Email is required!'
                        })
                    }/>

                <Field
                    id="password"
                    // label="Password"
                    placeholder="Enter yuor name"
                    type='password'
                    {
                        ...register('password', {
                            required: 'password is required!'
                        })
                    }/>

                <div>
                    <Button type={'submit'} onClick={() => setIsLoginForm(false)}>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm