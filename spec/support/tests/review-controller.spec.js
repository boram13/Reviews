const { createReview, readAllReviews, updateReview, deleteReview } = require('../../../controller/review');
const reviewService = require('../../../service/review');
const { validationResult } = require('express-validator/check');

describe('Review Controller', () => {
  describe('createReview', () => {
    it('should create a new review', async () => {
      const req = {
        body: {
          userId: 'user123',
          rate: 4,
          description: 'Great product!'
        }
      };
      const res = {
        status: jasmine.createSpy('status').and.returnValue({ json: jasmine.createSpy('json') })
      };

      spyOn(reviewService, 'createReview').and.returnValue({ userId: 'user123', rate: 4, description: 'Great product!' });

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.status().json).toHaveBeenCalledWith({ userId: 'user123', rate: 4, description: 'Great product!' });
    });

    it('should handle errors during review creation', async () => {
      const req = {};
      const res = {
        status: jasmine.createSpy('status').and.returnValue({ json: jasmine.createSpy('json') })
      };
      spyOn(reviewService, 'createReview').and.throwError('Failed to create review');

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to create review' });
    });
  });

  describe('readAllReviews', () => {
    it('should return all reviews', async () => {
      const req = {};
      const res = {
        json: jasmine.createSpy('json')
      };

      spyOn(reviewService, 'readAllReviews').and.returnValue([{ userId: 'user123', rate: 4, description: 'Great product!' }]);

      await readAllReviews(req, res);

      expect(res.json).toHaveBeenCalledWith([{ userId: 'user123', rate: 4, description: 'Great product!' }]);
    });

  });

});