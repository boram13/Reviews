const { expect } = require('chai');
const sinon = require('sinon');
const reviewService = require('../service/review');

describe('ReviewService', () => {
  describe('createReview', () => {
    it('should create a new review', async () => {

      const createReviewStub = sinon.stub(reviewService, 'createReview').resolves({ userId: '123', rate: 5, description: 'Great review' });

      const result = await reviewService.createReview('123', 5, 'Great review');

      expect(result).to.deep.equal({ userId: '123', rate: 5, description: 'Great review' });
      expect(createReviewStub.calledOnce).to.be.true;

      createReviewStub.restore();
    });
  });

});