const { Op } = require("sequelize");

class Repository {
    constructor(model) {
        this.model = model;
    }

    // --------------------------------------- [ Create ] ---------------------------------------
    // Create
    async create(data, options = {}) {
        try {
            return await this.model.create(data, options);
        } catch (err) {
            throw err;
        }
    }

    // Bulk Create
    async createAll(data, options = {}) {
        try {
            return await this.model.bulkCreate(data, options);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Read ] ---------------------------------------
    // Select All
    async getAll(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (err) {
            throw err;
        }
    }

    // findByPK
    async getById(id, options = {}) {
        try {
            return await this.model.findByPK(id, options);
        } catch (err) {
            throw err;
        }
    }

    // findOne
    async getOne(options = {}) {
        try {
            return await this.model.findOne(options);
        } catch (err) {
            throw err;
        }
    }

    // Find or create
    async getOrCreate(options = {}) {
        try {
            const [result, created] = await this.model.findOrCreate(options);
            return {
                result,
                created,
            };
        } catch (err) {
            throw err;
        }
    }

    // Find and Count All
    async getAndCountAll(options = {}) {
        try {
            return await this.model.findAndCountAll(options);
        } catch (err) {
            throw err;
        }
    }

    // Count
    async count(options = {}) {
        try {
            return await this.model.count(options);
        } catch (err) {
            throw err;
        }
    }

    // Maximum Value
    async max(field, options = {}) {
        try {
            return await this.model.max(field, options);
        } catch (err) {
            throw err;
        }
    }

    // Sum
    async sum(field, options = {}) {
        try {
            return await this.model.sum(field, options);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Update ] ---------------------------------------
    // Update   // Uses the primary key to update the rest of the properties
    async update(data, options = {}) {
        try {
            const [affectedRows] = await this.model.update(data, options);

            if (affectedRows === 0) return null;

            return await this.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Delete ] ---------------------------------------
    // Delete
    async delete(options) {
        try {
            const affectedRows = await this.model.destroy(options);
            if (affectedRows === 0) return null;
        } catch (err) {
            throw err;
        }
    }

    // Truncate
    async truncate(options = {}) {
        try {
            await this.model.truncate(options);
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
    async reloadData(options = {}) {
        try {
            return await this.reload(options);
        } catch (err) {
            throw err;
        }
    }

    // Increment
    async incrementFields(fields, options = {}) {
        try {
            return await this.increment(fields, options);
        } catch (err) {
            throw err;
        }
    }

    // Decrement
    async decrementFields(fields, options = {}) {
        try {
            return await this.decrement(fields, options);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Repository;
