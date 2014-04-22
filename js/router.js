Todos.Router.map(function() {
    this.resource('todos', { path: '/' }, function() {
        this.route('active');
        this.route('completed');
    });
});

Todos.TodosRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('todo');
    }
});

Todos.TodosIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('todos');
    }
});

Todos.TodosBaseFilterRoute = Ember.Route.extend({
   model: function () {
        return this.store.filter('todo', this.getFilteredList);
    },
    renderTemplate: function(controller) {
        this.render('todos/index', {controller: controller});
    } 
});

Todos.TodosActiveRoute = Todos.TodosBaseFilterRoute.extend({
    getFilteredList: function(todo) {
        return !todo.get('isCompleted');
    }
});

Todos.TodosCompletedRoute = Todos.TodosBaseFilterRoute.extend({
    getFilteredList: function(todo) {
        return todo.get('isCompleted');
    }
});
