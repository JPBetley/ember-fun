(function(Todos) {
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
    
    var baseFilterRoute = Ember.Route.extend({
       model: function () {
            return this.store.filter('todo', this.getFilteredList);
        },
        renderTemplate: function(controller) {
            this.render('todos/index', {controller: controller});
        } 
    });

    Todos.TodosActiveRoute = baseFilterRoute.extend({
        getFilteredList: function(todo) {
            return !todo.get('isCompleted');
        }
    });

    Todos.TodosCompletedRoute = baseFilterRoute.extend({
        getFilteredList: function(todo) {
            return todo.get('isCompleted');
        }
    });
})(Todos);
