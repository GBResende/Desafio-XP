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
  describe('testa o retorno de erro witdrawUserBalance', () => {
    it('Deve retornar um erro 404 com a mensagem "usuário não encontrado"', async () => {
      sinon.stub(usersModel, 'getUserById').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      try {
        await userService.witdrawUserBalance({ id: 1 });
      }
      catch (err) {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Usuário não encontrado');
      }
      usersModel.getUserById.restore();
      usersModel.witdrawUserBalance.restore();
    });
    it('Deve retornar um erro 400 com a mensagem "Você não tem saldo suficiente"', async () => {
      sinon.stub(usersModel, 'getUserById').resolves(usersMock.allInfoUser[0][0]);
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      try {
        await userService.witdrawUserBalance({userId: 1, amount: 100});
      }
      catch (err) {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Você não tem saldo suficiente');
      }
      usersModel.getUserById.restore();
      usersModel.witdrawUserBalance.restore();
    });
  });
  describe('testa a função depositUserBalance', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'depositUserBalance').resolves();
    });
    afterEach(async () => {
      usersModel.depositUserBalance.restore();
    });
    it('A função depositUserBalance da camada users Model deve ser chamada 1 vez', async () => {
      await userService.depositUserBalance({userId: 1, amount: 100});
      expect(usersModel.depositUserBalance.calledOnce).to.be.true
    });
  });
  describe('testa a função userBuyStock', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'createUserStock').resolves();
      sinon.stub(walletModel, 'increaseUserStock').resolves();
      sinon.stub(usersModel, 'userBuyStock').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      sinon.stub(stocksModel, 'decreaseStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.createUserStock.restore();
      walletModel.increaseUserStock.restore();
      usersModel.userBuyStock.restore();
      usersModel.witdrawUserBalance.restore();
      stocksModel.decreaseStock.restore();
    });
    it('Todas as funções devem ser chamadas sem lançamento de erros e não deve criar uma nova ação na carteira do usuário', async () => {
      await userService.userBuyStock({userId: 1, stockId: 10, quantity: 10});
      expect(walletModel.getUserStockById.calledOnce).to.be.true
      expect(usersModel.getUserById.calledOnce).to.be.true
      expect(stocksModel.getStockById.calledOnce).to.be.true
      expect(walletModel.increaseUserStock.calledOnce).to.be.true
      expect(walletModel.createUserStock.calledOnce).to.be.false
      expect(usersModel.userBuyStock.calledOnce).to.be.true
      expect(usersModel.witdrawUserBalance.calledOnce).to.be.true
      expect(stocksModel.decreaseStock.calledOnce).to.be.true
    });
  });
  describe('testa a função userBuyStock', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves();
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'createUserStock').resolves();
      sinon.stub(walletModel, 'increaseUserStock').resolves();
      sinon.stub(usersModel, 'userBuyStock').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      sinon.stub(stocksModel, 'decreaseStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.createUserStock.restore();
      walletModel.increaseUserStock.restore();
      usersModel.userBuyStock.restore();
      usersModel.witdrawUserBalance.restore();
      stocksModel.decreaseStock.restore();
    });
    it('cria uma nova ação na carteira do usuário', async () => {
      await userService.userBuyStock({userId: 1, stockId: 52, quantity: 10});
      expect(walletModel.createUserStock.calledOnce).to.be.true
    });
  });
  describe('testa o retorno de erro userBuyStock', () => {
    it('Deve retornar um erro 404 com a mensagem "usuário não encontrado"', async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves();
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'createUserStock').resolves();
      sinon.stub(walletModel, 'increaseUserStock').resolves();
      sinon.stub(usersModel, 'userBuyStock').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      sinon.stub(stocksModel, 'decreaseStock').resolves();
      try {
        await userService.userBuyStock({ id: 1 });
      }
      catch (err) {
        
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Usuário não encontrado');
      }
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.createUserStock.restore();
      walletModel.increaseUserStock.restore();
      usersModel.userBuyStock.restore();
      usersModel.witdrawUserBalance.restore();
      stocksModel.decreaseStock.restore();
    });
    it('Deve retornar um erro 400 com a mensagem "Você não tem saldo suficiente"', async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 0,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'createUserStock').resolves();
      sinon.stub(walletModel, 'increaseUserStock').resolves();
      sinon.stub(usersModel, 'userBuyStock').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      sinon.stub(stocksModel, 'decreaseStock').resolves();
      try {
        await userService.userBuyStock({userId: 1, stockId: 2, quantity: 100});
      }
      catch (err) {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Você não tem saldo suficiente');
      }
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.createUserStock.restore();
      walletModel.increaseUserStock.restore();
      usersModel.userBuyStock.restore();
      usersModel.witdrawUserBalance.restore();
      stocksModel.decreaseStock.restore();
    });
    it('Deve retornar um erro 400 com a mensagem "Não existem ações suficientes"', async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'createUserStock').resolves();
      sinon.stub(walletModel, 'increaseUserStock').resolves();
      sinon.stub(usersModel, 'userBuyStock').resolves();
      sinon.stub(usersModel, 'witdrawUserBalance').resolves();
      sinon.stub(stocksModel, 'decreaseStock').resolves();
      try {
        await userService.userBuyStock({userId: 1, stockId: 1, quantity: 15});

      }
      catch (err) {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Não existem ações suficientes');
      }
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.createUserStock.restore();
      walletModel.increaseUserStock.restore();
      usersModel.userBuyStock.restore();
      usersModel.witdrawUserBalance.restore();
      stocksModel.decreaseStock.restore();
    });
  });
  describe('testa a função userSellStock', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'decreaseUserStock').resolves();
      sinon.stub(usersModel, 'userSellStock').resolves();
      sinon.stub(usersModel, 'depositUserBalance').resolves();
      sinon.stub(stocksModel, 'increaseStock').resolves();
      sinon.stub(walletModel, 'deleteUserStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.decreaseUserStock.restore();
      usersModel.userSellStock.restore();
      usersModel.depositUserBalance.restore();
      stocksModel.increaseStock.restore();
      walletModel.deleteUserStock.restore();
    });
    it('Todas as funções devem ser chamadas sem lançamento de erros e não deve deletar a ação na carteira do usuário', async () => {
      await userService.userSellStock({userId: 1, stockId: 1, quantity: 2});
      expect(walletModel.getUserStockById.calledOnce).to.be.true
      expect(usersModel.getUserById.calledOnce).to.be.true
      expect(stocksModel.getStockById.calledOnce).to.be.true
      expect(walletModel.decreaseUserStock.calledOnce).to.be.true
      expect(walletModel.deleteUserStock.calledOnce).to.be.false
      expect(usersModel.userSellStock.calledOnce).to.be.true
      expect(usersModel.depositUserBalance.calledOnce).to.be.true
      expect(stocksModel.increaseStock.calledOnce).to.be.true
    });
  });
  describe('testa a função userSellStock quando o usuário tenta vender mais ações do que ele possui', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'decreaseUserStock').resolves();
      sinon.stub(usersModel, 'userSellStock').resolves();
      sinon.stub(usersModel, 'depositUserBalance').resolves();
      sinon.stub(stocksModel, 'increaseStock').resolves();
      sinon.stub(walletModel, 'deleteUserStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.decreaseUserStock.restore();
      usersModel.userSellStock.restore();
      usersModel.depositUserBalance.restore();
      stocksModel.increaseStock.restore();
      walletModel.deleteUserStock.restore();
    });
    it('deve retornar um erro "400" com a mensagem "Você só pode vender quantidade menor ou igual a sua"', async () => {
      try {
        await userService.userSellStock({userId: 1, stockId: 1, quantity: 50});

      } catch (err) {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Você só pode vender quantidade menor ou igual a sua');
      }
    });
  });
  describe('testa a função userSellStock quando o usuário vende todas as ações que ele possui', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'decreaseUserStock').resolves();
      sinon.stub(usersModel, 'userSellStock').resolves();
      sinon.stub(usersModel, 'depositUserBalance').resolves();
      sinon.stub(stocksModel, 'increaseStock').resolves();
      sinon.stub(walletModel, 'deleteUserStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.decreaseUserStock.restore();
      usersModel.userSellStock.restore();
      usersModel.depositUserBalance.restore();
      stocksModel.increaseStock.restore();
      walletModel.deleteUserStock.restore();
    });
    it('Deve deletar a ação da carteira do usuário', async () => {
      await userService.userSellStock({userId: 1, stockId: 1, quantity: 5});
      expect(walletModel.deleteUserStock.calledOnce).to.be.true
    });
  });
  describe('testa a função userSellStock quando o usuário não existe', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves(walletMock.walletByStockId);
      sinon.stub(usersModel, 'getUserById').resolves();
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'decreaseUserStock').resolves();
      sinon.stub(usersModel, 'userSellStock').resolves();
      sinon.stub(usersModel, 'depositUserBalance').resolves();
      sinon.stub(stocksModel, 'increaseStock').resolves();
      sinon.stub(walletModel, 'deleteUserStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.decreaseUserStock.restore();
      usersModel.userSellStock.restore();
      usersModel.depositUserBalance.restore();
      stocksModel.increaseStock.restore();
      walletModel.deleteUserStock.restore();
    });
    it('deve retornar um erro "404" com a mensagem "Usuário não encontrado"', async () => {
      try {
        await userService.userSellStock({userId: 1, stockId: 1, quantity: 50});

      } catch (err) {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Usuário não encontrado');
      }
    });
  });
  describe('testa a função userSellStock quando o usuário não possui a ação', () => {
    beforeEach(async () => {
      sinon.stub(walletModel, 'getUserStockById').resolves();
      sinon.stub(usersModel, 'getUserById').resolves({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345678',
        balance: 10000,
        createdAt: '2022-07-22 16:13:00',
      });
      sinon.stub(stocksModel, 'getStockById').resolves(stocksMock.stockById);
      sinon.stub(walletModel, 'decreaseUserStock').resolves();
      sinon.stub(usersModel, 'userSellStock').resolves();
      sinon.stub(usersModel, 'depositUserBalance').resolves();
      sinon.stub(stocksModel, 'increaseStock').resolves();
      sinon.stub(walletModel, 'deleteUserStock').resolves();
    });
    afterEach(async () => {
      walletModel.getUserStockById.restore();
      usersModel.getUserById.restore();
      stocksModel.getStockById.restore();
      walletModel.decreaseUserStock.restore();
      usersModel.userSellStock.restore();
      usersModel.depositUserBalance.restore();
      stocksModel.increaseStock.restore();
      walletModel.deleteUserStock.restore();
    });
    it('deve retornar um erro "400" com a mensagem "você não possui essa ação"', async () => {
      try {
        await userService.userSellStock({userId: 1, stockId: 1, quantity: 50});

      } catch (err) {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Você não possui essa ação');
      }
    });
  });
})