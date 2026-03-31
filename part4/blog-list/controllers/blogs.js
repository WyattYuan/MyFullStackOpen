const blogsRouter = require('express').Router()
const { Blog } = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
        return response.status(400).json({ error: error.message })
    }
})

blogsRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = blogsRouter