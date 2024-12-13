const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['sedan', 'suv', '7cho', 'thethao']
    },
    price: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: String,
    specifications: {
        power: String,
        transmission: String,
        fuelConsumption: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 