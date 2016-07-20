Ext.define('MarenTranslator.controller.Main', {
  extend: 'Ext.app.Controller',
  currentLanguage: 'english',
  alternateLanguage: 'maren',
  config: {
    stores: ['Dictionary'],
    refs: {
      'phraseField': 'main searchfield',
      'resultField': 'main textfield[readOnly=true]',
      'wordList': 'main #wordList'
    },
    control: {
      'segmentedbutton': {
        toggle: function(container, button) {
          this.currentLanguage = button.getText().toLowerCase();
          this.alternateLanguage = (this.currentLanguage == 'english') ? 'maren' : 'english';
          var me = this;
          this.getWordList().getStore().setGrouper({
            groupFn: function(record) {
              return record.get(me.currentLanguage)[0].toUpperCase();
            }
          });
          this.getWordList().getStore().sort(this.currentLanguage, 'ASC');
          this.getWordList().setItemTpl('{' + this.currentLanguage + '}');
          this.getPhraseField().fireEvent('keyup',this.getPhraseField());
        }
      },
      'wordList': {
        select: 'onWordListSelect'
      }
    }
  },
  launch: function() {
    this.getPhraseField().addListener({
      keyup: {
        fn: this.translatePhrase,
        buffer: 500,
        scope: this
      },
      clearicontap: {
        fn: function(field) {
          this.getResultField().setValue('');
          this.getWordList().deselectAll();
        },
        scope: this
      }
    });
  },
  onWordListSelect: function(list, record) {
    var curLanguageWords = this.getPhraseField().getValue().split(' ');
    var altLanguageWords = this.getResultField().getValue().split(' ');

    curLanguageWords.push(record.get(this.currentLanguage));
    altLanguageWords.push(record.get(this.alternateLanguage));

    this.getPhraseField().setValue(curLanguageWords.join(' '));
    this.getResultField().setValue(altLanguageWords.join(' '));
  },
  translatePhrase: function(field) {
    var phrase = field.getValue().toLowerCase();
    if (!Ext.isEmpty(phrase)) {
      var words = phrase.split(' ');
      var translatedWords = [];
      words.forEach(function(word, idx) {
        if (!Ext.isEmpty(word)) {
          var translation = this.translateWord(word, this.alternateLanguage);
          translatedWords[idx] = translation;
        }
      }, this);
      this.getResultField().setValue(translatedWords.join(' '));
    } else {
      this.getResultField().setValue('');
    }
  },
  translateWord: function(word, altLanguage, callback) {
    var index = Ext.getStore('Dictionary').findExact(this.currentLanguage, word);
    var record = Ext.getStore('Dictionary').getAt(index);

    if (record) {
      return record.get(this.alternateLanguage);
    }
  }
});
