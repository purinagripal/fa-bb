var HomeView = Backbone.View.extend({

    /*initialize: function () {
        this.eventos = this.model;
        console.log("eventos al inicio HomeView");
        //console.log(this.eventos);
        this.eventos.fetch({reset:true});
        this.listView = new EventoListView({collection: this.eventos});
        
    },
    
    render: function () {
        this.$el.html(this.template());
        $('.content', this.el).append(this.listView.render().el);
        return this;
    },*/
    
    initialize:function () {
        console.log('initialize de homeView');
        this.categoria = 0;
        this.ciudad = 0;
        this.model.bind("reset", this.render, this);
        this.model.fetch({reset: true, 
                          success: function() {
                            console.log( 'fetch terminado, esconde splashscreen' );
                            navigator.splashscreen.hide();
                          }
        });
        // ocultar pantalla presentacion cuando se cargue la lista
        //navigator.splashscreen.hide();
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
               function (evento) {$('.container', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
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