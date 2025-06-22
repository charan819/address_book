const Address = require("../model/Address");
const jwt = require("jsonwebtoken");
const secretKey = "jwtSecret";

exports.getAllAddress = async (req, res) => {
    try {
        const token = req.headers["authorization"].substring(7);
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.user.id;

        const addresses = await Address.find({ user: userId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAddressById = async (req, res) => {
    try {
        const id = req.params.id;
        const address = await Address.findById(id);
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.createAddress = async (req, res) => {
    try {
        const token = req.headers["authorization"].substring(7);
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.user.id;

        const {
            firstname,
            lastname,
            email,
            phone,
            addressline,
            state,
            pincode,
            country,
            dob,
        } = req.body;

        const address = new Address({
            user: userId,
            firstname,
            lastname,
            email,
            phone,
            addressline,
            state,
            pincode,
            country,
            dob,
        });

        await address.save();
        res.status(200).json({
            success: true,
            address: address,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstname,
            lastname,
            email,
            phone,
            addressline,
            state,
            pincode,
            country,
            dob,
        } = req.body;

        const address = await Address.findByIdAndUpdate(
            id,
            {
                firstname,
                lastname,
                email,
                phone,
                addressline,
                state,
                pincode,
                country,
                dob,
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            address: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        await Address.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Address Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting address",
        });
    }
};
