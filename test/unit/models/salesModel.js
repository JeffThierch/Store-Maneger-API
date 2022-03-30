const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/SalesModel');

const {allSalesMock, mockedSales } = require('../helpers/mocks')

describe('Sales Model Tests', () => {
  describe('getAll Method', () => {
    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([allSalesMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('An array' , async () => {
        const products = await salesModel.getAll();

        expect(products).to.be.a('array')
      });

      it('containing 2 objects' , async () => {
        const products = await salesModel.getAll();

        expect(products).to.have.length(2)
        expect(products).to.be.equal(allSalesMock)
      });
    })
  })

  describe('getById Method', () => {

    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockedSales]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('An Object', async () => {
        const product = await salesModel.getById(1);

        expect(product).to.be.a('object')
      })

      it('That containing "id", "name" and "quantity"', async () => {
        const product = await salesModel.getById(1);

        expect(product).to.be.equals(mockedSales[0]);
      })

    })

    describe("When wrongly called", () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Should return "false"', async () => {
        const product = await salesModel.getById(99);

        expect(product).to.be.equal(false);
      })
    })
  })
})

