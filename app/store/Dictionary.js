Ext.define('MarenTranslator.store.Dictionary', {
  extend: 'Ext.data.Store',
  requires: ['MarenTranslator.model.Term'],
  config: {
    model: 'MarenTranslator.model.Term',
    autoLoad: true,
    sorters: [{property: 'english', direction: 'ASC'}],
    proxy: {
      type: 'ajax',
      url: 'resources/data/maren.json'
    },
    grouper: {
      groupFn: function(record) {
        return record.get('english')[0].toUpperCase();
      }
    }
  }
});
