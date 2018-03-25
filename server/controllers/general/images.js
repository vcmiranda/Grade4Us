// const auth = require('../services/service.auth');

const formidable = require('formidable');
const template = require('../../services/service.files');
// const fse = require('fs-extra');
// const fs = require('fs');
// const path = require('path');


module.exports = {
  getImageStudent(req, res) {
    const filePath = `/images/students/${req.headers.studentid}.png`;

    if (template.exists(`static${filePath}`)) {
      res.json({ filePath, studentID: req.headers.studentid });
    } else {
      const defaultPath = '/images/students/default.jpg';
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
      file.path = `static/images/students/${studentID}.png`;
    });
    // upon reading field event
    form.on('field', (name, value) => {});
    form.on('error', (err) => {
      res.status(500);
    });
  },
};
