// Seed folder for cleaning up databases

const {
  sequelize,
  User,
  Project
} = require('../models')

const Promise = require('bluebird')
const users = require('./users.json')
const projects = require('./projects.json')
sequelize.sync({force: true}) 
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    ),
    await Promise.all(
      projects.map(project => {
        Project.create(project)
      })
    )
  })