const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/total_likes').totalLikes

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
            }
        ]
        const result = totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
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
            },
            {
                "title": "Turning a MacBook into a touchscreen with $1 of hardware (2018)",
                "author": "HughParry",
                "url": "https://anishathalye.com",
                "likes": 206
            },
            {
                "title": "Learn Claude Code by doing, not reading",
                "author": "taubek",
                "url": "https://nagdy.me",
                "likes": 158
            },
            {
                "title": "How to turn anything into a router",
                "author": "yabones",
                "url": "https://nbailey.ca",
                "likes": 595
            },
            {
                "title": "Agents of Chaos",
                "author": "luu",
                "url": "https://baulab.info",
                "likes": 72
            },
            {
                "title": "Why I'm betting on ATProto (and why you should, too)",
                "author": "speckx",
                "url": "https://brittanyellich.com",
                "likes": 76
            },
            {
                "title": "Bird brains (2023)",
                "author": "DiffTheEnder",
                "url": "https://dhanishsemar.com",
                "likes": 296
            }
        ]
        const result = totalLikes(blogs)
        assert.strictEqual(result, 2393)
    })

})