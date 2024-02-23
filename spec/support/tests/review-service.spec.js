const mongoose = require('mongoose');
const Review = require('../../../models/review');
const { createReview, readAllReviews, updateReview, deleteReview } = require('../../../service/review');
const { ObjectId } = require('mongodb');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('Review Service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://Boraa:BoraMenerja@cluster0.srxilpa.mongodb.net/');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const userId = 'user123';
      const rate = 5;
      const description = 'Great';

      const saveSpy = jasmine.createSpy('save').and.returnValue({});
      spyOn(Review.prototype, 'save').and.returnValue(saveSpy);

      const result = await createReview(userId, rate, description);

      expect(Review.prototype.save).toHaveBeenCalled();
    });
  });

  describe('readAllReviews', () => {
    it('should retrieve all reviews', async () => {
      const mockReviews = [{ userId: 'user123', rate: 4, description: 'Nice product' }];
      spyOn(Review, 'find').and.returnValue(mockReviews);

      const result = await readAllReviews();

      expect(Review.find).toHaveBeenCalled();
      expect(result).toEqual(mockReviews);
    });
  });

  describe('updateReview', () => {
    it('should update a review', async () => {
      const reviewId = 'review123';
      const userId = new ObjectId();
      const rate = 4;
      const description = 'Updated description';

      spyOn(Review, 'findById').and.returnValue({ userId, save: function () { return {} } });

      const result = await updateReview(reviewId, userId.toString(), description, rate);

      expect(Review.findById).toHaveBeenCalledWith(reviewId);
      expect(result).toEqual({})
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', async () => {
      const reviewId = 'review123';
      spyOn(Review, 'findByIdAndDelete').and.returnValue('Deleted review');

      const result = await deleteReview(reviewId);

      expect(Review.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
      expect(result).toEqual('Deleted review');
    });
  });
});
