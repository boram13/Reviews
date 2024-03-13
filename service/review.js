const Review = require('../models/review');
const mongoose = require('mongoose');

exports.createReview = async (userId, rate, description) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const review = new Review({
            userId,
            rate,
            description,
            insertDate: new Date()
        },
        );
        await review.save({ session });
        await session.commitTransaction();
        session.endSession();
        // await review.save()
        return review;
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        session.endSession();
        throw new Error('Failed to create review');
    }
}

exports.readAllReviews = async (page, limit) => {
    try {
        const first = (page-1)*limit;
        const last = page*limit;

        const reviews = await Review.find().skip(first).limit(limit);
        const total =  await Review.countDocuments();

        const pagination = {
            actualPage: page,
            totalPage: Math.ceil(total / limit),
            totalReviews: total
        }
        return {reviews, pagination };
    } catch (error) {
        throw new Error('Could not find any review!');
    }
};

exports.updateReview = async (reviewId, userId, description, rate) => {
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new Error('Review not found');
    }
    // TODO: add auth middleware check instead
    if (review.userId.toString() !== userId) {
        throw new Error('User does not have authority to update this review');
    }
    review.description = description;
    review.rate = rate
    return await review.save();
};

exports.deleteReview = async (reviewId) => {
    return Review.findByIdAndDelete(reviewId);
};
