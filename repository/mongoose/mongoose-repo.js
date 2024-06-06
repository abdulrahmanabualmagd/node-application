const mongoose = require("mongoose");

class Repository {
    constructor(model) {
        this.model = model;
    }

    // --------------------------------------- [ Create ] ---------------------------------------
    // Create
    async create(data, options = {}) {
        try {
            return await this.model.create(data, options); // pre save hook won't work here s
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
    async getAll(options = {}) {
        try {
            return await this.model.find(options).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // findById
    async getById(id, options = {}) {
        try {
            return await this.model.findById(id).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // findOne
    async getOne(options = {}) {
        try {
            return await this.model.findOne(options).populate(options.include);
        } catch (err) {
            throw err;
        }
    }

    // Find or create
    async getOrCreate(condition, data, options = {}) {
        try {
            let document = await this.model.findOne(condition).populate(options.include);
            if (!document) {
                document = new this.model(data);
                await document.save(options);
                return { result: document, created: true };
            }
            return { result: document, created: false };
        } catch (err) {
            throw err;
        }
    }

    // Find and Count All
    async getAndCountAll(options = {}) {
        try {
            const results = await this.model.find(options).populate(options.include);
            const count = await this.model.countDocuments(options);
            return { count, rows: results };
        } catch (err) {
            throw err;
        }
    }

    // Count
    async count(options = {}) {
        try {
            return await this.model.countDocuments(options);
        } catch (err) {
            throw err;
        }
    }

    // Maximum Value
    async max(field, options = {}) {
        try {
            const result = await this.model
                .findOne(options)
                .sort({ [field]: -1 })
                .select(field);
            return result ? result[field] : null;
        } catch (err) {
            throw err;
        }
    }

    // Sum
    async sum(field, options = {}) {
        try {
            const result = await this.model.aggregate([
                { $match: options },
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
            const deletedDocument = await this.model.deleteOne(options);
            return deletedDocument.deletedCount > 0 ? deletedDocument : null;
        } catch (err) {
            throw err;
        }
    }

    // Truncate
    async truncate(options = {}) {
        try {
            await this.model.deleteMany(options);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Utilities] ---------------------------------------
    // Save
    async saveData(document, options = {}) {
        try {
            return await document.save(options);
        } catch (err) {
            throw err;
        }
    }

    // Reload
    async reloadData(document, options = {}) {
        try {
            return await document.reload(options);
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
            return await this.model.findByIdAndUpdate(id, update, { new: true, ...options });
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
            return await this.model.findByIdAndUpdate(id, update, { new: true, ...options });
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Associations ] ---------------------------------------

}

module.exports = Repository;
