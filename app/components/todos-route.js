import Ember from 'ember';

const {
  inject: { service },
	computed
} = Ember;

export default Ember.Component.extend({
	tagName: 'ul',

  store: service(),
	active: computed.filterBy('todos', 'isCompleted', false),

  inflection: computed('active.[]', function() {
    var al = this.get('active.length');
    return al === 1 ? 'item' : 'items';
  }).readOnly(),

  actions: {
    createTodo() {
      const store = this.get('store');

      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');

      if (title && !title.trim()) {
        this.set('newTitle', '');
        return;
      }

      // Create the new Todo model
      var todo = store.createRecord('todo', {
        title: title
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

  },

});
