// import app from './App'

// const port = process.env.PORT || 3000
// n(port, (err) => {
//   if (err) {
//     return console.log(err)
//   }

//   return console.log(`server is listening on ${port}`)
// })
// app.liste


import login from './login'
const port = process.env.PORT || 3000
login.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})