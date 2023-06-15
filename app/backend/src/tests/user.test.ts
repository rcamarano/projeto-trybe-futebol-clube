import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SeqUserModel';
import { userRegistered, userNoPassword, validLoginBody } from './mocks/User.mocks';

chai.use(chaiHttp);


const { expect } = chai;

describe('Users Test', function() {
 describe('POST /login', () => {
  it('should return token', async () => {
    const userMock = SequelizeUser.build(userRegistered)
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
    const response = await chai.request(app)
      .post('/login')
      .send(validLoginBody)

    expect(response.status).to.be.equal(200)
    expect(response.body.token).not.to.be.undefined
  });

  // it('should return error message when no password is provided', async () => {
  //   const userMock = SequelizeUser.build(userNoPassword)
  //   sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
  //   const response = await chai.request(app)
  //     .post('/login')
  //     .send(userNoPassword)

  //   expect(response.status).to.be.equal(400)
  //   expect(response.body.message).to.be.equal('All fields must be filled');
  // });
})
});