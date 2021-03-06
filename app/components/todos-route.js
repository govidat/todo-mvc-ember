import Ember from 'ember';

const {
  inject: { service },
	computed
} = Ember;

export default Ember.Component.extend({
	tagName: 'ul',

  store: service(),
	active: computed.filterBy('todos', 'isCompleted', false),
  completed: computed.filterBy('todos', 'isCompleted', true),

  queriedTodos: computed('todos', 'filter', function() {
    //use anything and return 
    var tlist = this.get('todos');
    var f = this.get('filter');

    if(f === 'all'){
    	return tlist
    }
    else if(f === 'completed'){
        return this.get('completed')
    }
    else if(f === 'active'){
        return this.get('active')
    }
    else{
    	// inform the user probably
        return tlist	
    }
  }),


  inflection: computed('active.[]', function() {
    var al = this.get('active.length');
    return al === 1 ? 'item' : 'items';
  }).readOnly(),

  areAllCompleted: computed('active.[]', 'active', 'todos', function(){
	 console.log(this.get('active.length'));
	 return this.get('active.length') === 0 
  }),

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
		
		clearCompleted() {
         this.get('completed').invoke('deleteRecord')
		},

		toggleAll() {
	   var checkState = this.get('areAllCompleted')

	   this.get('todos').setEach('isCompleted', checkState)
	   this.get('todos').invoke('save')
		}

  },

});
