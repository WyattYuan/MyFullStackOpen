const supertest = require('supertest');
const app = require('../app');
// supertest 需要传入一个 Express 应用程序实例，才能模拟 HTTP 请求并测试 API 的行为。
const api = supertest(app);
const mongoose = require('mongoose');

const { initialBlogs, nonExistingId, retrieveBlogsAsJson } = require('./test_helper')
const { test, beforeEach, after } = require('node:test')
const { Blog } = require('../models/blog')

const assert = require('node:assert/strict')

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

after(async () => {
    await mongoose.connection.close()
})