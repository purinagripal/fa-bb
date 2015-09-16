var HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('initialize de homeView');
        this.categoria = 0;
        this.ciudad = 0;
        // this.model.bind("reset", this.render, this);
        this.model.on("reset", this.render, this);
        this.model.fetch({reset: true, 
                          success: function() {
                            console.log( 'fetch terminado, esconde splashscreen' );
                            // // ocultar pantalla presentacion 
                            setTimeout(function() {
                                navigator.splashscreen.hide();
                            }, 1500);
                            //navigator.splashscreen.hide();
                          }
        });
    },

    render:function () {
        console.log('render de homeView');
                
        this.$el.html(this.template());
           
        // boton categoria
        var categ_txt;
        switch(this.categoria) {
            case '1':
                categ_txt = 'Música';
                break;
            case '4':
                categ_txt = 'Talleres';
                break;
            case '5':
                categ_txt = 'Charlas';
                break;
            default:
                categ_txt = 'Categoría';
        }
        this.$('#dropdownMenuCateg').html(categ_txt+' <span class="caret"></span>');
        
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
                
        _.each(this.model.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        return this;
    },

    events: {
        "click .menu_salir": "salir",
        "click .cuadro": "ver_evento"
    },
    
    ver_evento: function (event) {
        console.log("ver evento");
        console.log(event);
        Backbone.history.navigate('eventos/5', {trigger: true});
        //router.navigate('eventos/{{id_evento}}', {trigger: true});
    },

    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});