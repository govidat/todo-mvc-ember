import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['filter'],
  filter: 'all',
});
