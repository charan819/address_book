// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../backend/route/authRoutes");
const addressRoutes = require("../backend/route/addressRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/address-book", {
        family: 4,
    })
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));