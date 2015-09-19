var EventoView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
        "click .local_link": "ver_local"
        
//        "click .menu_salir": "salir"
    },
    
    ver_local: function (event) {
        var id_local = $(event.currentTarget).attr('data-id'); 
        Backbone.history.navigate('local/'+id_local, {trigger: true});
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});