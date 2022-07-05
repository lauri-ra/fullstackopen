const listHelper = require ('../utils/list_helper')

const noBlogs = []

const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('Total amount of likes', () => {
    test('of an empty list is zero', () => {
      const result = listHelper.totalLikes(noBlogs)
      expect(result).toBe(0)
    })

    test('of a list with only one blog equals likes of that', () => {
      const likes = oneBlog[0].likes
      const result = listHelper.totalLikes(oneBlog)
      expect(result).toBe(likes)
    })

    test('of a bigger list is calculated correctly', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
})

describe('Found the most liked blog', () => {
  test('list containing zero blogs returns null', () => {
    const result = listHelper.favoriteBlog(noBlogs)
    expect(result).toEqual(null)
  })

  test('from a list containing only one blog', () => {
    const mostLiked = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(mostLiked)
  })

  test('from a bigger list', () => {
    const mostLiked = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostLiked)
  })
})