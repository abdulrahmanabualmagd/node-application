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

    // findByPK -> findByPk
    async getById(id, options = {}) {
        try {
            return await this.model.findByPk(id, options);
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
    async update(id, data, options = {}) {
        try {
            const [affectedRows] = await this.model.update(data, { where: { id }, ...options });

            if (affectedRows === 0) return null;

            return await this.getById(id);
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
            return affectedRows;
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
    async reloadData(document, options = {}) {
        try {
            return await document.reload(options);
        } catch (err) {
            throw err;
        }
    }

    // Increment
    async incrementFields(document, fields, options = {}) {
        try {
            return await document.increment(fields, options);
        } catch (err) {
            throw err;
        }
    }

    // Decrement
    async decrementFields(document, fields, options = {}) {
        try {
            return await document.decrement(fields, options);
        } catch (err) {
            throw err;
        }
    }

    // --------------------------------------- [ Associations ] ---------------------------------------

    async addAssociations(source, target, targetModelName) {
        const addMethodName = `add${targetModelName}s`;
        const targetAddMethodName = `add${source.constructor.name}`;

        if (source[addMethodName]) {
            await source[addMethodName](target);
        } else if (target[targetAddMethodName]) {
            await target[targetAddMethodName](source);
        } else {
            throw new Error(`Association methods ${addMethodName} or ${targetAddMethodName} not found`);
        }
    }

    async setAssociations(source, target, targetModelName) {
        const setMethodName = `set${targetModelName}s`;
        const targetSetMethodName = `set${source.constructor.name}`;

        if (source[setMethodName]) {
            await source[setMethodName](target);
        } else if (target[targetSetMethodName]) {
            await target[targetSetMethodName](source);
        } else {
            throw new Error(`Association methods ${setMethodName} or ${targetSetMethodName} not found`);
        }
    }

    async removeAssociations(source, target, targetModelName) {
        const removeMethodName = `remove${targetModelName}s`;
        const targetRemoveMethodName = `remove${source.constructor.name}`;

        if (source[removeMethodName]) {
            await source[removeMethodName](target);
        } else if (target[targetRemoveMethodName]) {
            await target[targetRemoveMethodName](source);
        } else {
            throw new Error(`Association methods ${removeMethodName} or ${targetRemoveMethodName} not found`);
        }
    }

    async hasAssociation(source, target, targetModelName) {
        const hasMethodName = `has${targetModelName}`;
        const targetHasMethodName = `has${source.constructor.name}`;

        if (source[hasMethodName]) {
            return source[hasMethodName](target);
        } else if (target[targetHasMethodName]) {
            return target[targetHasMethodName](source);
        } else {
            throw new Error(`Association methods ${hasMethodName} or ${targetHasMethodName} not found`);
        }
    }

    async countAssociations(source, targetModelName) {
        const countMethodName = `count${targetModelName}s`;
        if (source[countMethodName]) {
            return source[countMethodName]();
        } else {
            throw new Error(`Count method ${countMethodName} not found`);
        }
    }
}

module.exports = Repository;
