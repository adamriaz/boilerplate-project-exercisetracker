const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const { userValidation, exerciseValidation, logParamsValidation } = require('./validation');
const { createUser, getUsers, createExercise, getExerciseLogs } = require('./service');
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  userValidation.validate(req.body)
    .then(async (data) => {
      const result = await createUser(data.username);
      res.json(result)
    })
    .catch(err => res.json({ "error": err.message }))

});

app.get('/api/users', async (req, res) => {
  const result = await getUsers()
  res.json(result);
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const id = req.params._id;
  if (id === "" || id === undefined) res.json({ "error": "id is missing" });

  exerciseValidation.validate(req.body)
    .then(async (data) => {
      const result = await createExercise(id, data);
      res.json(result);
    })
    .catch(err => res.json({ "error": err.message }))
});

app.get('/api/users/:_id/logs', async (req, res) => {
  const id = req.params._id;
  if (id === "" || id === undefined) res.json({ "error": "id is missing" });

  logParamsValidation.validate(req.query)
    .then(async (data) => {
      const results = await getExerciseLogs(id, data.from, data.to, data.limit);
      res.json(results);
    })
    .catch(err => res.json({ "error": err.message }));

});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
