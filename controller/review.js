const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');
const EventService = require('../service/event')

const reviewService = require('../service/review');

exports.createReview = async (req, res, next) => {
  try {
    const { userId, rate, description } = req.body;
    const review = await reviewService.createReview(userId, rate, description);
    await EventService.saveEvent(userId, "review", 'create')
    res.status(201).json(review);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create review' });
  }
}

exports.readAllReviews = async (req, res, next) => {
const userId = req.user.userId;
// const page = parseInt(req.query.page) || 1;
// const limit = parseInt(req.query.limit) || 3;
let { page, limit } = req.body;


  try {
    const { reviews, pagination }  = await reviewService.readAllReviews(page, limit, userId);
    console.log(req.user)
    await EventService.saveEvent(userId, "review", 'read')
    res.json({ reviews, pagination })
  } catch (error) {
    res.json({ message: error.message });
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
    await EventService.saveEvent(userId, "review", 'update')
    res.status(200).json({ message: 'Review is successfully updates', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.userId;//aksesoj userId nga requesta
  try {
    await reviewService.deleteReview(reviewId);
    await EventService.saveEvent(userId, "review", 'delete')
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to delete review', error });
  }
};

