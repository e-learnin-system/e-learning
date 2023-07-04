'use strict'

class Collection {
    constructor(model) {
        this.model = model;
    }

    get(id) {
        if (id) {
            return this.model.findOne({ where: { id } });
        }
        else {
            return this.model.findAll({});
        }
    }

    create(obj) {
        return this.model.create(obj);
    }

    async update(id, obj) {
        try {
            await this.model.update(obj, { where: { id } })
            const newUpdate = await this.read(id)
            return newUpdate;
        } catch (error) {
            console.log(`error while updating the record ${this.model}`)
            return error;
        }
    }
    delete(id) {
        return this.model.destroy({ where: { id } });
    }

}

module.exports = Collection;