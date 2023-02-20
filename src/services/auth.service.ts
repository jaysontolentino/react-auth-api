import prisma from './../../prisma/prisma'
import * as argon2 from 'argon2'

export interface ILoginPayload {
    email: string
    password: string
}

export interface IregisterPayload {
    email: string
    name: string
    password: string
}

export const signIn = async function(payload: ILoginPayload) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if(!user) throw new Error('Invalid credential.')

        const match = await argon2.verify(user.password, payload.password)

        if(!match) throw new Error('Invalid password')

        return user
    } catch (error) {
        throw error
    }
}

export const signUp = async function(payload: IregisterPayload) {
    try {

        const hashedPassword = await argon2.hash(payload.password)

        payload.password = hashedPassword

        const user = await prisma.user.create({
            data: payload
        })

        return user
    } catch (error) {
        throw error
    }
}

export const signOut = async function() {
    try {
        
    } catch (error) {
        throw error
    }
}