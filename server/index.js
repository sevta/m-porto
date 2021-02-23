const app = require('express')()
const bodyParser = require('body-parser')
const fs = require('fs')
const ytsr = require('ytsr')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send({ msg: 'ok' })
})

app.get('/music/yt/search', async (req, res) => {
  const { q } = req.query
  console.log('searching...', q)
  try {
    const search = await ytsr.getFilters(q)
    const filter = search.get('Type').get('Video')
    const resp = await ytsr(filter.url, { pages: 1 })
    console.log(resp.items.length)
    res.send({ result: resp.items })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: 'error' })
  }
})

app.post('/content/save', async (req, res) => {
  console.log(req.body)
  fs.writeFile(
    './content/home.json',
    JSON.stringify(req.body),
    'utf8',
    function(err, data) {
      console.log('creating file home.json...')
      if (err) console.log(err)
      console.log(data)
      res.send({ msg: 'success' })
    }
  )
})

app.post('/music/save', (req, res) => {
  const { id, title, url, thumbnail, duration } = req.body
  let music = JSON.stringify({
    id,
    title,
    url,
    thumbnail,
    duration
  })

  console.log('writing file...', music)

  fs.writeFile(`./content/music/${id}.json`, music, 'utf8', function(
    err,
    data
  ) {
    console.log('creating file...')
    if (err) res.status(500).send({ msg: 'error' })
    res.send({ msg: 'success' })
  })
})

module.exports = app
