import { cookies } from "next/headers"

const generateCookiesAuth = () => {
    const cookieStore = cookies()
    const client_id = cookies().get('client_id')?.value
    const access_token = cookies().get('access_token')?.value
    const refreshToken = cookies().get('refresh_token')?.value
    return {client_id, access_token, refreshToken}
}

export {generateCookiesAuth}