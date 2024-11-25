import {axiosClassic} from "@/api/intersetion";
import {IAuthLoginForm, IAuthResponse} from "@/types/authTypes";
import {saveTokenStorage} from "@/services/authTokens";

export const authService = {
    async main(type: 'login' | 'register', data: IAuthLoginForm) {
        const response = await axiosClassic.post<IAuthResponse>('/auth/' + type, data)

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>('/login/access-token')

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    }
}