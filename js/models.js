var Evento = Backbone.Model.extend({
    idAttribute: 'id_evento'
});

var EventoCollection = Backbone.Collection.extend({

    model: Evento,

    url: "http://test.mepwebs.com/agenda_app",
    
    obtenerLocales: function(){
        var localesList = new Backbone.Collection([
            {id_user: 1, first_name: "Canela Café", id_ciudad: 1},
            {id_user: 2, first_name: "Return Bar", id_ciudad: 1},
            {id_user: 3, first_name: "Corralejo Café", id_ciudad: 2},
            {id_user: 4, first_name: "Blanco y Negro", id_ciudad: 2}
        ]);
        
        return localesList;
    }

});
