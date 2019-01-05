'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product.find({
        active: true});
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        active: true,
        slug: slug
    }, 'title description price slug tag');
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Product.find({
        active: true,
        tags: tag
    }, 'title description')
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    const res = await product.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Product.findByIdAndUpdate(
        id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug,
            tags: data.tags
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Product.findByIdAndRemove(id)
    return res
}