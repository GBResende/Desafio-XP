const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const connection = require('../db/connection');
const usersModel = require('../models/users.model');
const usersMock = require('./mocks/users.mock');

describe('Testa a camada model', () => {
  describe('Testa o método getUserById', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').returns([[usersMock.allInfoUser]]);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Deve retornar um usuário', async () => {
      const user = await usersModel.getUserById(2);
      expect(connection.execute.calledOnce).to.be.true;
      expect(user).to.be.equal(usersMock.allInfoUser);
    });
  });
