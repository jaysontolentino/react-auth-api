import * as jwt from 'jsonwebtoken'
import config from './../config'

export type TPayloadToken = {
    user_id: number
    email: string
}

export type TDecodedToken = {
    user_id: string
    email: string
    iat: number,
    exp: number,
    iss: string
}

export type TCreateTokenType = 'access_token' | 'refresh_token'

export const createToken = async function(type: TCreateTokenType, payload: TPayloadToken): Promise<string | jwt.JsonWebTokenError> {

    let secretKey: jwt.Secret = type === 'access_token' 
        ? config.jwt.keyAccessToken
        : config.jwt.keyRefreshToken

    let expiresIn = type === 'access_token' ? `5m` : `1d`


    const createOptions: jwt.SignOptions = {
        issuer: config.server.host,
        expiresIn
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload,secretKey, createOptions, function(err, token) {
            if(err) reject(err)

            resolve(token as string)
        })
    })
}

export const verifyToken = function<T>(type: TCreateTokenType, token: string): Promise<T> {

    let secretKey = type === 'access_token'
        ? config.jwt.keyAccessToken
        : config.jwt.keyRefreshToken

    const verifyOptions: jwt.VerifyOptions = {
        issuer: config.server.host
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, verifyOptions, function(err, decoded) {
            if(err) reject(err)

            resolve(decoded as T)
        })
    })
}