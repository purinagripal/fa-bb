var EventoView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    
    events: {
        "click .local_link": "ver_local",
        "click .boton_atras": "volver_atras",
        "click .menu_salir": "salir"
    },
    
    ver_local: function (event) {
        var id_local = $(event.currentTarget).attr('data-id'); 
        Backbone.history.navigate('local/'+id_local, {trigger: true});
    },
    
    volver_atras: function (event) {
        console.log("volver");
        Backbone.history.history.back();
        // es lo mismo que:
        //window.history.back();
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});