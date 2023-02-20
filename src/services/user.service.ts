import { exclude } from './../utils/prisma.util'
import prisma from './../../prisma/prisma'
import { User } from '@prisma/client'

export const getAllUsers = async function() {
    try {
        const users = await prisma.user.findMany()

        return users
    } catch (error) {
        throw error
    }
}

export const getUser = async function(id: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        const {password, ...rest} = user as User

        return rest
    } catch (error) {
        throw error
    }
}