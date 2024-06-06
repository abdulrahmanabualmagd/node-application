const mongoose = require("mongoose");

class Repository {
    constructor(model) {
        this.model = model;
    }

    // --------------------------------------- [ Create ] ---------------------------------------
    // Create
    async create(data, options = {}) {
        try {
            return await this.model.create(data); // pre save hook will work here
        } catch (err) {
            throw err;
        }
    }

    // Bulk Create
    async createAll(data, options = {}) {
        try {
            return await this.model.insertMany(data, options); // Save hook won't work for this method
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Read ] ---------------------------------------
    // Select All
    async getAll(options = { include: null, where: {} }) {
        try {
            return await this.model.find(options.where).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // findById
    async getById(id, options = { include: null }) {
        try {
            return await this.model.findById(id).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // findOne
    async getOne(options = { include: null, where: {} }) {
        try {
            return await this.model.findOne(options.where).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // Find or create
    async getOrCreate(data, options = { include: null, where: {} }) {
        try {
            let document = await this.model.findOne(options.where).populate(options.include);
            if (!document) {
                document = new this.model(data);
                await document.save();
                return { result: document, created: true };
            }
            return { result: document, created: false };
        } catch (err) {
            throw err;
        }
    }

    // Find and Count All
    async getAndCountAll(options = { include: null, where: {} }) {
        try {
            const results = await this.model.find(options.where).populate(options.include);
            const count = await this.model.countDocuments(options.where);
            return { count, rows: results };
        } catch (err) {
            throw err;
        }
    }

    // Count
    async count(options = { where: {} }) {
        try {
            return await this.model.countDocuments(options.where);
        } catch (err) {
            throw err;
        }
    }

    // Maximum Value
    async max(field, options = { where: {} }) {
        try {
            const result = await this.model
                .findOne(options.where)
                .sort({ [field]: -1 })
                .select(field);
            return result ? result[field] : null;
        } catch (err) {
            throw err;
        }
    }

    // Sum
    async sum(field, options = { where: {} }) {
        try {
            const result = await this.model.aggregate([
                { $match: options.where },
                { $group: { _id: null, total: { $sum: `$${field}` } } },
            ]);
            return result.length > 0 ? result[0].total : 0;
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Update ] ---------------------------------------
    // Update
    async update(data, options = {}) {
        try {
            return await this.model.findByIdAndUpdate(data._id, data, { new: true, ...options });
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Delete ] ---------------------------------------
    // Delete
    async delete(options) {
        try {
            const deletedDocument = await this.model.deleteOne(options.where);
            return deletedDocument.deletedCount > 0 ? deletedDocument : null;
        } catch (err) {
            throw err;
        }
    }

    // Truncate
    async truncate(options = {}) {
        try {
            await this.model.deleteMany(options.where);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Utilities] ---------------------------------------
    // Save
    async saveData(document) {
        try {
            return await document.save();
        } catch (err) {
            throw err;
        }
    }

    // Reload
    async reloadData(id, options = { include: null }) {
        try {
            return await this.model.findById(id).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // Increment
    async incrementFields(id, fields, options = {}) {
        try {
            const update = {};
            for (const field in fields) {
                update[field] = { $inc: fields[field] };
            }
            return await this.model.findByIdAndUpdate(id, { $inc: fields }, { new: true, ...options });
        } catch (err) {
            throw err;
        }
    }

    // Decrement
    async decrementFields(id, fields, options = {}) {
        try {
            const update = {};
            for (const field in fields) {
                update[field] = { $inc: -fields[field] };
            }
            return await this.model.findByIdAndUpdate(id, { $inc: update }, { new: true, ...options });
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Associations ] ---------------------------------------
    async addAssociations(source, targetArray) {
        source[targetArray.field].push(...targetArray.values);
        return source.save();
    }

    async setAssociations(source, targetArray) {
        source[targetArray.field] = targetArray.values;
        return source.save();
    }

    async removeAssociations(source, targetArray) {
        source[targetArray.field] = source[targetArray.field].filter((value) => !targetArray.values.includes(value));
        return source.save();
    }

    async hasAssociation(source, target) {
        return source[target.field].includes(target.value);
    }

    async countAssociations(source, targetField) {
        return source[targetField].length;
    }
}

module.exports = Repository;
