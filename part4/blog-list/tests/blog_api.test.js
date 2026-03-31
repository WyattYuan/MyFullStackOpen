const supertest = require('supertest');
const app = require('../app');
// supertest 需要传入一个 Express 应用程序实例，才能模拟 HTTP 请求并测试 API 的行为。
const api = supertest(app);
const mongoose = require('mongoose');

const { initialBlogs, nonExistingId, retrieveBlogsAsJson } = require('./test_helper')
const { test, beforeEach, after } = require('node:test')
const { Blog } = require('../models/blog')

const assert = require('node:assert/strict');
const { url } = require('node:inspector');
const { info } = require('node:console');

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('验证博客文章类型', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('验证博客文章数量', async () => {
    const blogs = await retrieveBlogsAsJson()
    assert.strictEqual(blogs.length, initialBlogs.length)
})

test('验证博客文章的唯一标识符属性名为 id', async () => {
    const blogs = await retrieveBlogsAsJson()
    assert.ok(blogs[0].id)
    assert.strictEqual(blogs[0]._id, undefined)
})

test('验证新博客的创建', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 10
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await retrieveBlogsAsJson()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
})

test('验证如果请求中缺少 likes 属性，它将默认为值 0', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com'
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await retrieveBlogsAsJson()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('验证如果请求中缺少 title 和 url 属性，服务器将响应状态码 400 Bad Request', async () => {
    const noTitle = {
        author: 'Test Author',
        url: 'http://testblog.com'
    }
    await api.post('/api/blogs')
        .send(noTitle)
        .expect(400)

    const noUrl = {
        title: 'Test Blog',
        author: 'Test Author'
    }
    await api.post('/api/blogs')
        .send(noUrl)
        .expect(400)

    const noTitleAndUrl = {
        author: 'Test Author'
    }
    await api.post('/api/blogs')
        .send(noTitleAndUrl)
        .expect(400)
})

test('验证博客文章的获取', async () => {
    const blogsAtEnd = await retrieveBlogsAsJson()
    const idAt0 = blogsAtEnd[0].id

    const blogRetrieved = await api.get(`/api/blogs/${idAt0}`)

    assert.deepStrictEqual(blogRetrieved.body, blogsAtEnd[0])
})

test('验证博客文章的删除', async () => {
    const blogsBefore = await retrieveBlogsAsJson()
    const idToDelete = blogsBefore[0].id
    const expected = blogsBefore.filter(blog => blog.id !== idToDelete)

    await api.delete(`/api/blogs/${idToDelete}`)
        .expect(204)
    const blogsAfter = await retrieveBlogsAsJson()
    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
    assert.deepStrictEqual(blogsAfter, expected)
})

test('验证博客文章的更新', async () => {
    const blogsBefore = await retrieveBlogsAsJson()
    const idToUpdate = blogsBefore[0].id
    const updatedBlog = { likes: blogsBefore[0].likes + 1 }
    const expected = { ...blogsBefore[0], ...updatedBlog } // 不会冲突。后展开的对象属性覆盖前面的。

    await api.put(`/api/blogs/${idToUpdate}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await retrieveBlogsAsJson()
    assert.deepStrictEqual(blogsAfter[0], expected)
})

after(async () => {
    await mongoose.connection.close()
})