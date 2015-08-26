var Evento = Backbone.Model.extend({
    idAttribute: 'id_evento'
});

var EventoCollection = Backbone.Collection.extend({

    model: Evento,

    url: "http://test.mepwebs.com/agenda_app"

});
