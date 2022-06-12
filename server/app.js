const express = require('express');
const bodyParser = require('body-parser');
const { Agent, Review } = require('./model');
const { validator } = require('./validator');
const { agentSchema, reviewSchema } = require('./schemas');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Agent APIS
app.get('/agents', async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

app.get('/agents/:id', async (req, res, next) => {
  const agentId = req.params.id;
  const agent = await Agent.findByPk(agentId);
  return res.json(agent);
});

app.post('/agents', async (req, res, next) => {
  const agent = req.body;
  agent.agentLicence = Math.floor(Math.random() * 1000000000).toString();
  const valid = validator(agentSchema, agent);

  // if validator return error 
  if (valid.error) {
    return res.json(valid.error.details);
  }

  try {
    const response = await Agent.create({ ...agent });
    return res.json(response.toJSON());
  } catch (err) {
    return res.json({ errorMsg: "Agent not created. Something went wrong!" });
  }
});

// Review APIs
app.get('/reviews/:agentId', async (req, res, next) => {
  const agentId = req.params.agentId;
  const reviews = await Review.findAll({
    where: {
      agentId: agentId
    }
  });
  return res.json(reviews);
});

app.post('/reviews', async (req, res, next) => {
  const review = req.body;
  const valid = validator(reviewSchema, review);

  // if validator return error 
  if (valid.error) {
    return res.json(valid.error.details);
  }

  try {
    const response = await Review.create({ ...review });
    return res.json(response.toJSON());
  } catch (err) {
    return res.json({ errorMsg: "Review not Added. Something went wrong!" });
  }
});


module.exports = app;
