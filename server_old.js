const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const ManagersReport = require('./reports/statistic_managers')();
const ManagerAnalytic = require('./Analytics/analytic_managers')();
const DirectorAnalytic = require('./Analytics/analytic_director')();
//process.env.NODE_ENV = 'production';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/user', (req, res) => {
  console.log("мы здеся запрашиваем юзера");
  res.send({success: true, data: {
    firstName: "Иван",
    lastName: "Иванов",
    vacantion: "Менеджер",
    age: "34"
  }})
})

app.post('/auth/token', (req, res) => {
  console.log('запросили токен')
  console.dir(req.headers)
  if(req.body.username == 'loh' && req.body.password == '123') res.send({success: true, user_token:'1234567890'})
  res.send({ success: false, error: "Неверная пара логин пароль" })
})

app.post('/api/1C', (req, res) => {
  console.log('обратились сюда');
  console.log(req.body);
  axios.post(`http://93.94.156.38:82/CRM_NOAUTO_TEST/hs/d-okno/Setintegration`, req.body)
  .then(respon => {
    res.send({success: true, data: respon.data});
  })
  .catch((err)=> {
    console.log(err);
    res.send({success: false, data: respon.data});
  })
});

app.post('/api/checkAuth',(req,res) => {
  console.log('проверяем токен');
  res.send({success: true, data: 'kuku'})
})

app.post('/api/analytic/reports', (req, res) => {
  console.log('запрашиваем отчет');

    switch (req.body.reportname) {
      case 'statistic_managers':

        ManagersReport.getReport(req.body.stdate, req.body.fndate)
        .then((result) => {res.send({ success: true, data: result })})
        .catch((err) => { throw new Error(err) });
        break;
      default:

    }


})


app.post('/api/analytics', (req, res) => {
  console.log('запрашиваем аналитику');
console.log(req.body);
  switch (req.body.analyticType) {

    case 'specificManagerAnalytic':
        ManagerAnalytic.getAnalytic({...req.body})
        .then(result => res.send({ success: true, data: result }))
        .catch((err) => { throw new Error(err) });
      break;

    case 'director':
        DirectorAnalytic.getAnalytic({...req.body})
        .then(result => res.send({ success: true, data: result }))
        .catch((err) => { throw new Error(err) });
      break;

    default:
    console.log('по умолчанию');

  }


})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
