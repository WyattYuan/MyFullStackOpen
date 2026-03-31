const { Blog } = require('../models/blog')

const initialBlogs = [
    {
        "title": "Universal Claude.md – cut Claude output tokens by 63%",
        "author": "killme2008",
        "url": "https://github.com/drona23",
        "likes": 41
    },
    {
        "title": "Fedware: Government apps that spy harder than the apps they ban",
        "author": "speckx",
        "url": "https://sambent.com",
        "likes": 431
    },
    {
        "title": "Android Developer Verification",
        "author": "ingve",
        "url": "https://googleblog.com",
        "likes": 147
    },
    {
        "title": "Do your own writing",
        "author": "karimf",
        "url": "https://alexhwoods.com",
        "likes": 371
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const retrieveBlogsAsJson = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    retrieveBlogsAsJson,
}
