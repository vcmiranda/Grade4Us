// const auth = require('../services/service.auth');

const formidable = require('formidable');
const template = require('../../services/service.files');
const fs = require('fs');
const path = require('path');


module.exports = {
  getImageURLStudent(req, res) {
    const basePath = '../../static/images/students/';
    const fileName = `${req.headers.studentid}.png`;
    const filePath = path.join(__dirname, basePath, fileName);
    const returnPath = path.join('/images/students/', fileName);


    if (template.exists(filePath)) {
      res.json({ path: returnPath, studentID: req.headers.studentid });
    } else {
      const defaultPath = { path: '/images/students/default.jpg', studentID: req.headers.studentid };
      res.json(defaultPath);
    }
  },

  saveImageStudent(req, res) {
    const studentID = req.body.studentID;
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.json('received upload');
    });
    // upon reading file event
    form.on('fileBegin', (name, file) => {
      file.path = `/images/students/${studentID}.png`;
    });
    // upon reading field event
    form.on('field', (name, value) => {});
    form.on('error', (err) => {
      res.status(500);
    });
  },
};
