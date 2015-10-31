import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', { defaultValue: false })
}); 

Todo.reopenClass({
  FIXTURES: [
  {
    id: 1,
    title: 'Learn Ember2.js',
    isCompleted: true
  },
  {
    id: 2,
    title: '...',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Profit!',
    isCompleted: false
  }
  ]
});

export default Todo;
