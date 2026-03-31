const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    return blogs.reduce((favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite
    })

}

module.exports = {
    favoriteBlog
}