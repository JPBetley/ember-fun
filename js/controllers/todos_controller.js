Todos.TodosController = Ember.ArrayController.extend({
    actions: {
        createTodo: function() {
            // Get the todo title set by the "New Todo" text field
            var title = this.get('newTitle');
            if (!title.trim()) { return; }

            // Create the new Todo model
            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });

            // Clear the "New Todo" text field
            this.set('newTitle', '');

            // Save the new model
            todo.save(); 
        },
        clearCompleted: function() {
            var completed = this.get('completedItems');
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },

    remaining: function() {
        return this.filterBy('isCompleted', false).get('length');
    }.property('@each.isCompleted'),

    inflection: function() {
        var remaining = this.get('remaining');
        return remaining === 1 ? "todo" : "todos";
    }.property("remaining"),

    hasCompleted: function() {
        return this.get('completed') > 0;
    }.property("@each.isCompleted"),

    completed: function() {
        return this.get('completedItems').get('length');
    }.property("@each.isCompleted"),

    completedItems: function() {
        return this.filterBy('isCompleted', true);
    }.property("@each.isCompleted"),

    allAreDone: function(key, value) {
        if (value === undefined) {
            return !!this.get('length') && this.everyProperty('isCompleted', true);
        } else {
            this.setEach('isCompleted', value);
            this.invoke('save');
            return value;
        }
    }.property("@each.isCompleted")
});