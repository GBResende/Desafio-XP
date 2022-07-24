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
  describe('Testa o método getUserAccount', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([[usersMock.userAccount]]);
    });
    afterEach(async () => {
      connection.execute.restore();
    });
    it('Deve retornar a conta do usuário', async () => {
      const userAccount = await usersModel.getUserAccount(2);
      expect(connection.execute.calledOnce).to.be.true;
      expect(userAccount).to.be.equal(usersMock.userAccount);
    });
  });
