'use strict';

const { faker } = require('@faker-js/faker');
const axios = require('axios');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.generator = async (event) => {
  const timeToGenerate = +event.pathParameters.numData;
  const dataGenerated = [...new Array(timeToGenerate)]
    .map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      color: faker.internet.color(),
      companyName: faker.company.companyName(),
    }))
  return dataGenerated;
};

module.exports.pokemon = async (event) => {
  const pokemonName = event.pathParameters.name;
  const config = {
    method: 'get',
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    responseType: 'applications/json'
  };
  const { data } = await axios(config)
  const moves = data.moves.map(({ move }) => move.name)
  const stats = data.stats.map(({stat}) => stat.name)
  const types = data.types.map(({type}) => type.name)
  return {
    name: data.name,
    weight: data.weight,
    moves,
    stats,
    types,
  };
};