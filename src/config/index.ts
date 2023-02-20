import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
dotenv.config()

export type TJwtConfig = {
    readonly keyAccessToken: jwt.Secret
    readonly keyRefreshToken: jwt.Secret
}

interface IConfig {
    server: {
        host: string
        port: number
    },
    jwt: TJwtConfig
}

const {
    SERVER_HOST,
    SERVER_PORT,
    JWT_ACCESS_KEY,
    JWT_REFRESH_KEY
} = process.env

const jwtConfig: TJwtConfig = {
    keyAccessToken: JWT_ACCESS_KEY || 'secret_access_token',
    keyRefreshToken: JWT_REFRESH_KEY || 'secret_refresh_token',
}

const config: IConfig = {
    server: {
        host: SERVER_HOST || 'localhost',
        port: Number(SERVER_PORT) || 5000
    },
    jwt: jwtConfig
}

export default config