import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SeqUserModel';
import { invalidEmail, invalidPassword, regUser, userNoPassword, validLoginBody } from './mocks/User.mocks';

chai.use(chaiHttp);


const { expect } = chai;

describe('Users Test', function () {
  describe('POST /login', () => {
    it('should return token', async () => {
      const userMock = SequelizeUser.build(regUser)

      sinon.stub(SequelizeUser, 'findOne').resolves(userMock)

      const response = await chai.request(app)
        .post('/login')
        .send(validLoginBody)

      expect(response.status).to.be.equal(200)
      expect(response.body.token).not.to.be.undefined
    });

    it('should return "all fields must be filled - no password"', async () => {
      const userMock = SequelizeUser.build(regUser);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);
    
      const response = await chai
        .request(app)
        .post('/login')
        .send({ email: 'test@example.com' }); // Não fornece a senha
    
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
    
    afterEach(() => {
      sinon.restore();
    });    

    it('should return "All fields must be filled - no email', async () => {
      const userMock = SequelizeUser.build(regUser)

      sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
      const response = await chai.request(app)
        .post('/login')
        .send({ password: '123456' })

      expect(response.status).to.be.equal(400)
      expect(response.body.message).to.be.equal('All fields must be filled')
    })

    it('Should return "Invalid email or password" - invalid email', async () => {
      const userMock = SequelizeUser.build(regUser)

      sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
      const response = await chai.request(app)
        .post('/login')
        .send(invalidEmail)

      expect(response.status).to.be.equal(401)
      expect(response.body.message).to.be.equal('Invalid email or password')
    });

    it('Should return "Invalid email or password" - invalid password', async () => {
      const userMock = SequelizeUser.build(regUser)

      sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
      const response = await chai.request(app)
        .post('/login')
        .send(invalidPassword)

      expect(response.status).to.be.equal(401)
      expect(response.body.message).to.be.equal('Invalid email or password')
    });
  })
});