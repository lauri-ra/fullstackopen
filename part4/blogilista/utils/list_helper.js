const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumOfLikes = blogs.reduce(
        (total, item) => total + item.likes, 0
    )
    
    return sumOfLikes
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
    }
    else {
        const mostLiked = blogs.reduce(
            (prev, curr) => prev.likes > curr.likes ? prev : curr
        )

        const favorite = {
            title: mostLiked.title,
            author: mostLiked.author,
            likes: mostLiked.likes
        }

        return favorite
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}