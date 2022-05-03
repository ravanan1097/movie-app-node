const model = require("../model/movie_model");

exports.createMovie = async (req, res) => {
    try {
        let { movieName, rating, cast, genre, releasedOn } = req.body;
        const releaseDate = new Date(releasedOn);

        let movie = await model.findOne({ movieName });
        if (movie)
            return res.json("Record already exists")

        let data = await model.create({ movieName, rating, cast, genre, releaseDate });
        console.log(data)
        return res.json("Success");
    }
    catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

exports.findmovie = async (req, res) => {
    try {
        let { movieName } = req.body;
        console.log(movieName)

        let movie = await model.findOne({ movieName });

        if (!movie) return res.json("Record doesn't exists");
        console.log(movie)
        return res.json(movie)
    }
    catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

exports.findAll = async (req, res) => {
    try {
        let movieList = await model.find();
        console.log(movieList);
        return res.json(movieList);
    } catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

exports.deleteMovie = async (req, res) => {
    try {

        let { movieName } = req.body;
        let deleteMovie = await model.findOneAndDelete({ movieName })
        console.log(deleteMovie)
        if (deleteMovie)
            return res.json("Deleted Successfully")
        else
            return res.json("Record not found")

    } catch (err) {

        console.error(err);
        return res.json(err.message);
    }
};

exports.updateMovie = async (req, res) => {
    try {
        let { movieName, rating, cast, genre, releasedOn } = req.body;

        const releaseDate = new Date(releasedOn);

        let movie = await model.findOne({ movieName });

        if (!movie) return res.json("Record doesn't exists");

        let query = {
            $set: { rating, genre, releaseDate },
            $push: { cast: cast }
        }
        let updatedMovie = await model.updateOne({ movieName }, query);
        console.log(updatedMovie)

        if (updatedMovie.modifiedCount !== 0) res.json("Modified");
        else res.json("Not Modified")


    } catch (err) {
        console.error(err);
        return req.json(err.message)

    }
}

