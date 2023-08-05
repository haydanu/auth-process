const chai = require('chai');
const request = require('supertest');

const { server } = require('../app');
const { expect } = chai;

describe('User', async () => {
  it('Failed to signup, request body uncomplete', async () => {
    // const { body, status } = await request(server).post('/users/signup');
  });
});