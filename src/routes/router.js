'use strict';

const express = require('express');

const model = require('../models/index')
const router = express.Router();
const middleware = require('../auth/model/middleware/modelMiddleware.model')
const isAuth = require('../auth/model/middleware/bearer')
const acl = require('../auth/model/middleware/acl')

router.param('model', middleware);
router.get('/:model', isAuth, acl('post'), handleGetAll);
router.get('/:model/:id', isAuth, acl('read'), handleGetOne);
router.post('/:model', isAuth, this.model === 'teacher' ? acl('post') : acl('delete'), handleCreate);
router.put('/:model/:id', isAuth, this.model === 'teacher' ? acl('post') : acl('delete'), handleUpdate);
router.delete('/:model/:id', isAuth, acl('delete'), handleDelete);
router.get('/:model/grades/:id', isAuth, acl('post'), allStudent);


async function handleGetAll(req, res) {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
    const id = req.params.id; s

    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
}
async function allStudent(req, res) {
    const id = req.params.id;
    const theRecord = await req.model.readAll(id, model.studentModel);
    res.status(200).json(theRecord)
}

module.exports = router;