const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated unique identifier of the review.
 *         userId:
 *           type: string
 *           description: The ID of the user who created the review.
 *         rate:
 *           type: number
 *           description: The rating given in the review.
 *         description:
 *           type: string
 *           description: The description of the review.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the review was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the review was last updated.
 */

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
