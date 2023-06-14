import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SeqTeamModel from '../database/models/SeqTeamModel';

// import { Response } from 'superagent';
import { teams } from './mocks/team.moch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams testes', () => {

  it('should return all teams', async () => {
    sinon.stub(SeqTeamModel, "findAll").resolves(teams as any);

    const { body, status } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('should return a team by id', async () => {
    const team = teams[0];

    sinon.stub(SeqTeamModel, "findByPk").resolves(team as any);

    const { body, status } = await chai.request(app).get(`/teams/${team.id}`);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });
});
