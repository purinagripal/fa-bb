var LocalesView = Backbone.View.extend({

    initialize:function () {
        console.log('initialize de localesView');
        this.ciudad = 0;
        this.render();
    },

    render:function () {
        console.log('render de localesView');
                
        this.$el.html(this.template(this.model.toJSON()));
        
        // boton ciudad
        var ciudad_txt;
        switch(this.ciudad) {
            case '1':
                ciudad_txt = 'Lajares';
                break;
            case '2':
                ciudad_txt = 'Corralejo';
                break;
            default:
                ciudad_txt = 'Ciudad';
        }
        this.$('#dropdownMenuCiudad').html(ciudad_txt+' <span class="caret"></span>');
                
        /*_.each(this.model.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);*/
        return this;
    },

    events: {
        "click .menu_salir": "salir"
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});