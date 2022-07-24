const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const usersModel = require('../models/users.model');
const usersMock = require('./mocks/users.mock');
const walletMock = require('./mocks/wallet.mock');
const stocksMock = require('./mocks/stocks.mock');
const stocksModel = require('../models/stocks.model');
const walletModel = require('../models/wallet.model');
const userService = require('../services/users.service');

describe('testa a camada de users Service', () => {
  describe('testa a função getUserById', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getUserById').resolves(usersMock.allInfoUser[0][0]);
    });
    afterEach(async () => {
      usersModel.getUserById.restore();
    });
    it('Deve retornar um usuário', async () => {
      const user = await userService.getUserById({ id: 1 });
      expect(user).to.be.eql(usersMock.userByCredentials[0][0]);
    });
  });
