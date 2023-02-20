import prisma from './../../prisma/prisma'

interface IPostCreate {
  title: string
  content?: string
  authorId: number
}

export const getAllPost = async function() {
    try {
        return await prisma.post.findMany()
    } catch (error) {
        throw error
    }
}

export const getPost = async function(id: number) {
    try {
        return await prisma.post.findUnique({
            where: {
                id
            }
        })
    } catch (error) {
        throw error
    }
}

export const createPost = async function(payload: IPostCreate) {
    try {
        return await prisma.post.create({
            data: payload
        })
    } catch (error) {
        throw error
    }
}