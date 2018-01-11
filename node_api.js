const Interfake = require('interfake')

const interfake = new Interfake()

interfake.post('/login').body({
  success: true
})

interfake.post('/logout').body({
  success: true
})

interfake.get('/list').body([{
  name: 'Foo',
  id: 1,
  wateringDays: ['2018-01-19']
}, {
  name: 'Bar',
  id: 2,
  wateringDays: ['2018-01-19']
}, {
  name: 'Baz',
  id: 3,
  wateringDays: ['2018-01-19']
}])

interfake.post(/\/\d*\/add-date/).body({
  success: true
})

interfake.post(/\/\d*\/remove-date/).body({
  success: true
})

interfake.listen(3000)