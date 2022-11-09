module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    event.params.data.username = 'Bootcampniano';
  },
};
