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
        
        // añade entrada al historial
        window.historial.push('local/'+id_local);
        console.log("window.historial: "+window.historial);
        
        Backbone.history.navigate('local/'+id_local, {trigger: true});
    },
    
    volver_atras: function (event) {
        console.log("volver");
        
        // saca elemento del historial y vuelve al anterior
        window.historial.pop();
        console.log("window.historial: "+window.historial);
        Backbone.history.navigate( window.historial[window.historial.length-1], {trigger: true} );
        
        //console.log(Backbone.history.location);
        //Backbone.history.history.back();
        // es lo mismo que:
        //window.history.back();
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});