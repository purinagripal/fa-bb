var HomeView = Backbone.View.extend({

    /*initialize: function () {
        this.eventos = this.model;
        console.log("eventos al inicio HomeView");
        //console.log(this.eventos);
        this.eventos.fetch({reset:true});
        this.listView = new EventoListView({collection: this.eventos});
        
    },
    
    render: function () {
        this.$el.html(this.template());
        $('.content', this.el).append(this.listView.render().el);
        return this;
    },*/
    
    initialize:function () {
        console.log('initialize de homeView');
        this.model.bind("reset", this.render, this);
        this.model.fetch({reset:true});
    },

    render:function (eventName) {
        console.log('render de homeView');
        console.log(JSON.stringify(this.model.models));
        
        this.$el.html(this.template());

        _.each(this.model.models, 
               function (evento) {$('.container', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        return this;
    }

    /*events: {
        "keyup .search-key":    "search",
        "keypress .search-key": "onkeypress"
    },

    search: function (event) {
        var key = $('.search-key').val();
        console.log(key);
        this.eventos.fetch({reset: true, data: {name: key}});
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }*/

});