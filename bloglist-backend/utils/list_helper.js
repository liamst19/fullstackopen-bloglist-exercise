const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs? blogs.reduce((sum, blog) => sum + blog.likes, 0) : 0
}

const favoriteBlog = (blogs) => {
  const maxVal = Math.max(...blogs.map(blog => blog.likes))
  const result = blogs.filter(blog => blog.likes === maxVal)
  return result.length > 0 ? result[0] : null
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((athrs, blg) => {
    if(athrs.some(ar => ar.author === blg.author)){
      return athrs.map(a => {
        if(a.author === blg.author){
          return {
            author: a.author,
            blogs: a.blogs + 1
          }
        }
        else{
          return a
        }
      })
    }
    else{
      return athrs.concat({
        author: blg.author,
        blogs: 1
      })
    }
  }, [])
  const maxVal = Math.max(...authors.map(author => author.blogs))
  const result = authors.filter(author => author.blogs === maxVal)
  return result.length > 0 ? result[0] : null
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((athrs, blg) => {
    if(athrs.some(ar => ar.author === blg.author)){
      return athrs.map(a => {
        if(a.author === blg.author){
          return {
            author: a.author,
            likes: a.likes + blg.likes
          }
        }
        else{
          return a
        }
      })
    }
    else{
      return athrs.concat({
        author: blg.author,
        likes: blg.likes
      })
    }
  }, [])
  const maxVal = Math.max(...authors.map(author => author.likes))
  const result = authors.filter(author => author.likes === maxVal)
  return result.length > 0 ? result[0] : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
