import Cookies from 'js-cookie';
import {TokenNames} from "@/constants/AuthConstatnts";

export const getAccessToken = () => {
    const accessToken = Cookies.get(TokenNames.ACCESS_TOKEN)
    return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
    Cookies.set(TokenNames.ACCESS_TOKEN, accessToken, {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 1
    })
}

export const removeFromStorage = () => {
    Cookies.remove(TokenNames.ACCESS_TOKEN)
}