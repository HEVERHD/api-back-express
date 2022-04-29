const db = require('./src/db');
const server = require('./src/app');

db.sync({force: false}).then(()=>{
  console.log('DB CONECTED')
  server.listen(3000, () => console.log('Server listen on port 3000'));
})