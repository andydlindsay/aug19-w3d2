const cookies = {
  '1': {
    id: 1,
    name: 'Sugar Cookie',
    ingredients: 'sugar'
  },
  '2': {
    id: 2,
    name: 'Chocolate Cookie',
    ingredients: 'chocolate'
  },
  '3': {
    id: 3,
    name: 'Oatmeal Cookie',
    ingredients: 'oatmeal, raisins'
  }
};

const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser({ extended: false }));

// browse
app.get('/cookies', (request, response) => {
  const templateVars = { cookies };
  response.render('cookies', templateVars);
});

// add
app.get('/cookies/new', (request, response) => {
  response.render('new-cookie');
});

app.post('/cookies', (request, response) => {
  const name = request.body.name;
  const ingredients = request.body.ingredients;
  const id = uuid().split('-')[0];
  cookies[id] = {
    id,
    name,
    ingredients
  };
  response.redirect('/cookies');
});

// read
app.get('/cookies/:id', (request, response) => {
  const id = request.params.id;
  const templateVars = { cookie: cookies[id] };
  response.render('cookie', templateVars);
});

// edit
app.post('/cookies/:id', (request, response) => {
  const newName = request.body.newName;
  const id = request.params.id;
  cookies[id].name = newName;
  response.redirect(`/cookies/${id}`);
});

// delete
app.post('/cookies/:id/delete', (request, response) => {
  const id = request.params.id;
  delete cookies[id];
  response.redirect('/cookies');
});

app.get('*', (request, response) => {
  response.redirect('/cookies');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
