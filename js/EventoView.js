var EventoView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
//        "click .menu_salir": "salir"
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});