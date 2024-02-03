const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');

const reviewService = require('../service/review');

exports.createReview = async (req, res) => {
  try {
    const { userId, rate, description } = req.body;
    const review = await reviewService.createReview(userId, rate, description);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
}

exports.readAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.readAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { userId, description, rate } = req.body;
  const { reviewId } = req.params

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  try {
    const updatedReview = await reviewService.updateReview(reviewId, userId, description, rate);
    res.status(200).json({ message: 'Review is successfully updates', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    await reviewService.deleteReview(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
};


