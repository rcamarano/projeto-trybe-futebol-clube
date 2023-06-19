import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { mockMatch, mockInProgress } from './mocks/matches.mocks';
import { Model } from 'sequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing GET on /matches', function () {
  let chaiHttpResponse: Response;

  it('Should return all matches', async function () {
    sinon.stub(Model, 'findAll').resolves(mockMatch);
     chaiHttpResponse = await chai
       .request(app).get('/matches').send(mockMatch);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Should return inProgress filtered matches', async function () {
    sinon.stub(Model, 'findAll').resolves(mockMatch);

    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect([response.body[0]]).to.deep.equal([mockInProgress[0]]);
  });

  it('Should return finished filtered matches', async function () {
    sinon.stub(Model, 'findAll').resolves(mockMatch);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect([response.body[1]]).to.deep.equal([mockInProgress[1]]);
  });

  afterEach(sinon.restore);
});