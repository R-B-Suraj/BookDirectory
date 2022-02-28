const app = require('./src/server');

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is set up and running on port 3000');
})