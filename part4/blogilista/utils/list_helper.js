const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumOfLikes = blogs.reduce(
        (total, item) => total + item.likes, 0
    )
    
    return sumOfLikes
}

module.exports = {
    dummy,
    totalLikes
}