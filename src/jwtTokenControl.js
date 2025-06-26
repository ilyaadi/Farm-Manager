import { jwtVerify } from 'jose'

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.TOKEN_SECRET),
}
//const secret = process.env.TOKEN_SECRET;
const secretKey = process.env.TOKEN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(sessions, string) {
    try {
        const { payload } = await jwtVerify(sessions, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}
export const isAuthenticated = async req => {
    //let token = req.headers.get('authorization') || req.headers.get('Authorization')
    const session = req.cookies.get('token')?.value || '';
    let token = await decrypt(session)
    console.log(`Token1: ${token}`);
    if (token) {
        console.log('Token found ')
        try {
            if (token.startsWith('Bearer')) {
                token = token.replace('Bearer ', '')
            }

            //const decoded = await jose.jwtVerify(token, jwtConfig.secret)

            console.log(`Decoded Token1: ${token.id}`);
            if (token.payload?._id) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.error('isAuthenticated error: ', err)

            return false
        }
    } else {
        console.log('Token NOT found')
        return false
    }
}