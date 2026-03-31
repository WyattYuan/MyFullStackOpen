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

test('should get correct blogs type', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('should get correct blogs', async () => {
    const blogs = await retrieveBlogsAsJson()
    assert.strictEqual(blogs.length, initialBlogs.length)
})

test('验证博客文章的唯一标识符属性名为 id', async () => {
    const blogs = await retrieveBlogsAsJson()
    assert.ok(blogs[0].id)
    assert.strictEqual(blogs[0]._id, undefined)
})



after(async () => {
    await mongoose.connection.close()
})