var LocalView = Backbone.View.extend({

    initialize:function () {
        
    },

    render:function () {
        console.log('render de local');
                
        this.$el.html(this.template());
        
        var primerEvento = this.collection.at(0);
        $('.localDetails', this.el).html(new LocalDetailsView({model: primerEvento}).render().el);
                
        _.each(this.collection.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        return this;
    },

    events: {
        "click .guiaeventos.eventoslocal .cuadro": "l_ver_evento"
    },
    
    l_ver_evento: function (event) {
        console.log("ver evento dsd local, antes de data-id");
        var id_evento = $(event.currentTarget).attr('data-id'); 
        console.log("ver evento dsd local "+id_evento);
        //console.log(event);

        Backbone.history.navigate('eventos/'+id_evento, {trigger: true});
    }

});