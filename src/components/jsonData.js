import axios from 'axios'

export {getUsers, getAlbums, getPhotos}
export const albums = axios.get('https://jsonplaceholder.typicode.com/albums')
                  .then(res => {
                    return res.data
                  })


function getUsers(){
  return new Promise ((res, rej) => {

  })
  return axios.get('https://jsonplaceholder.typicode.com/albums')
  .then(res => {
    return _(res.data)
      .groupBy(x => x.userId)
      .map((value, key) => ({user: key, albums: value}))
      .value();
  }, (err) => {
    console.log(err)
  })
}
