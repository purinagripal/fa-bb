var LocalView = Backbone.View.extend({

    initialize:function () {
        
    },

    render:function () {
        console.log('render de local');
                
        this.$el.html(this.template());
        
        var primerEvento = this.collection.at(1);
        $('.localDetails', this.el).html(new LocalDetailsView({model: primerEvento}).render().el);
                
        _.each(this.collection.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        return this;
    },

    events: {
        "click .cuadro": "ver_evento"
    },
    
    ver_evento: function (event) {
        var id_evento = $(event.currentTarget).attr('data-id'); 
        console.log("ver evento "+id_evento);
        //console.log(event);
        Backbone.history.navigate('eventos/'+id_evento, {trigger: true});
    }

});