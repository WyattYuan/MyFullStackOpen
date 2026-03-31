const supertest = require('supertest');
const app = require('../app');
// supertest 需要传入一个 Express 应用程序实例，才能模拟 HTTP 请求并测试 API 的行为。
const api = supertest(app);
const mongoose = require('mongoose');

const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')
const { test, beforeEach, after } = require('node:test')
const { Blog } = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('should get correct blogs', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})