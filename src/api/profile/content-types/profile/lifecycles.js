module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    const username = data.username.split(/<?([^<]+?)@/)
    event.params.data.username = username[1];
  },
};
