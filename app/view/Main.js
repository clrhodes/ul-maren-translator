Ext.define('MarenTranslator.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.SegmentedButton',
        'Ext.dataview.List'
    ],
    config: {
        layout: 'fit',
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'Maren Translator'
        }, {
            xtype: 'toolbar',
            layout: 'vbox',
            docked: 'top',
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'searchfield',
                placeHolder: 'Enter Phrase'
            }, {
                xtype: 'textfield',
                name: 'translation',
                readOnly: true
            }]
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'segmentedbutton',
                items: [{
                    text: 'English',
                    pressed: true
                }, {
                    text: 'Maren'
                }]
            }]
        }, {
            xtype: 'list',
            store: 'Dictionary',
            itemId: 'wordList',
            itemTpl: '{english}',
            grouped: true,
            indexBar: true
        }]
    }
});
