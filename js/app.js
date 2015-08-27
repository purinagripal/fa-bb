// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EventoListItemView.prototype.template = Handlebars.compile($("#eventos-list-tpl").html());
    EventoView.prototype.template = Handlebars.compile($("#evento-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var slider = new PageSlider($('body'));
    

    var homeView;

    var AppRouter = Backbone.Router.extend({

        routes: {
            "":             "home",
            "categ/:id_cat":    "categoria",
            "eventos/:id":  "eventoDetails"
        },

        home: function () {
            // Since the home view never changes, we instantiate it and render it only once
            if (!homeView) {
                this.eventosList = new EventoCollection();
                homeView = new HomeView({model: this.eventosList});
                //homeView.render();
            } else {
                console.log('reusing home view');
                homeView.delegateEvents(); // delegate events when the view is recycled
            }
            slider.slidePage(homeView.$el);
        },
        
        categoria: function (id_cat) {
            
            if (id_cat == 0) {
                // todas las categorías, vuelve a mostrar la lista inicial
                this.eventosCateg = this.eventosList;
                //homeView.$('#dropdownMenu1').text('Todas <span class="caret"></span>');
            } else {
                // coge el evento de la coleccion del HOME y crea una nueva coleccion con ese array
                this.eventosCateg = new EventoCollection(this.eventosList.where({id_categoria: id_cat}));
                //homeView.$('#dropdownMenu1').text('Música <span class="caret"></span>');
            }
            
            console.log("imprime listacategoria");
            console.log(id_cat);
            console.log(this.eventosCateg);
            //console.log(JSON.stringify(this.eventosCateg));
            
            homeView.model = this.eventosCateg;
            homeView.render(id_cat);
        },

        eventoDetails: function (id) {
            //var employee = new Evento({id: id});
            // coge el evento de la coleccion del HOME
            this.evento = this.eventosList.get(id);
            slider.slidePage(new EventoView({model: this.evento}).render().$el);
        }
        
    });

    var router = new AppRouter();
    Backbone.history.start();

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        // boton salir
        //document.getElementById('salir').addEventListener('click', function(){navigator.app.exitApp();});
        
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
                  
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());