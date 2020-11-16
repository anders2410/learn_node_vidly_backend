const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("movies", movieSchema);

// Validating the Movie
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().max(100).required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
