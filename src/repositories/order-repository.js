'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async() => {
    const res = await Order.find({})
        .populate('usuario')
        .populate('items.product');
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    const res = await order.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Order.findByIdAndUpdate(
        id, {
        $set: {
            usuario: data.usuario,
            number: data.number,
            createDate: data.createDate,
            status: data.status,
            items: data.items
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Order.findByIdAndRemove(id)
    return res
}