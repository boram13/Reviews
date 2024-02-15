const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesEnum = ['admin', 'user'];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - email
 *         - name
 *         - surname
 *         - role
 */

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nrOfReviews: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    required: true,
    enum: rolesEnum
  },
},
  { timestamps: true });

module.exports = mongoose.model('User', userSchema);


