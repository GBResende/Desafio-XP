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
  describe('testa a o retorno de erro getUserById', () => {
    beforeEach(() => {
      sinon.stub(usersModel, 'getUserById').resolves();
    });
    afterEach(() => {
      usersModel.getUserById.restore();
    });
    it('Deve retornar um usuário', async () => {
      try {
        await userService.getUserById({ id: 1 });
      }
      catch (err) {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Usuário não encontrado');
      }
    });
  })
  describe('testa a função getUserAccount', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getUserAccount').resolves(usersMock.userAccount[0][0]);
    });
    afterEach(async () => {
      usersModel.getUserAccount.restore();
    });
    it('Deve retornar um os dados do usuário incluindo balance', async () => {
      const user = await userService.getUserAccount({ id: 1 });
      expect(user).to.be.eql(usersMock.userAccount[0][0]);
    });
  });
  describe('testa o retorno de erro getUserAccount', () => {
    beforeEach(() => {
      sinon.stub(usersModel, 'getUserAccount').resolves();
    });
    afterEach(() => {
      usersModel.getUserAccount.restore();
    });
    it('Deve retornar um erro 404 com a mensagem "usuário não encontrado"', async () => {
      try {
        await userService.getUserAccount({ id: 1 });
      }
      catch (err) {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Usuário não encontrado');
      }
    });
  });
  describe('testa a função postUser', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'postUser').resolves();
    });
    afterEach(async () => {
      usersModel.postUser.restore();
    });
    it('A função getUserAccount da camada de model deve ser chamada 1 vez', async () => {
      await userService.postUser({
        name: 'teste', email: 'teste@teste.com', password: '12345678'
      });
      expect(usersModel.postUser.calledOnce).to.be.true
    });
  });
  describe('testa a função whitdrawUserBalance', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getUserById').resolves(usersMock.allInfoUser[0][0]);
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
    });
    afterEach(async () => {
      usersModel.getUserById.restore();
      usersModel.witdrawUserBalance.restore();
    });
    it('As funções getUserById e witdrawUserBalance da camada users Model devem ser chamada 1 vez', async () => {
      await userService.witdrawUserBalance({ id: 1 });
      expect(usersModel.getUserById.calledOnce).to.be.true
      expect(usersModel.witdrawUserBalance.calledOnce).to.be.true
    });
  });
