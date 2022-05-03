const mongoose = require("mongoose");
require("dotenv").config();
const env = process.env;
exports.mongoosedb = () => {
    mongoose.connect(env.mongo_uri, (err) => {
        if (!err)
            console.log("MongoDB Connection Succeeded");
        else
            console.log("MongoDB Connection Failed");
    }

    )
};
