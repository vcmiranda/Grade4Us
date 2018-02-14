module.exports = {
  /**
   * @desc Converts an array of objects into a single key'd json object
   * @param {array} Array Array of JSON objects
   * @param {property} String The propery to key each of the objects by.
   * @example keyJSON([{ id: 1, name: 'One' }, { id: 2, name: 'Two' }], id)
   * @returns {json} Returns a key'd json object. Ex: { 1:{ id: 1, name: 'One' }, 2:{ id: 2, name: 'Two' } }
  */
  keyJSON(array, property) {
    const object = {};
    array.forEach((element) => {
      object[element[property]] = element;
    });
    return object;
  },
};
