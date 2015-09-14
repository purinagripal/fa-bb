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
            "":                 "home",
            "categ/:id_cat":    "categoria",
            "zona/:id_ciudad":  "ciudad",
            "eventos/:id":      "eventoDetails"
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
            
            homeView.categoria = id_cat;
            
            console.log('categ: '+homeView.categoria);
            console.log('ciudad: '+homeView.ciudad);
            
            if (homeView.categoria == 0) {
                if( homeView.ciudad != 0 ) {
                    // filtra solo x por ciudad
                    this.eventosCateg = new EventoCollection(this.eventosList.where({id_ciudad: homeView.ciudad}));
                } else {
                    // coge todas las categorías, vuelve a mostrar la lista inicial
                    this.eventosCateg = this.eventosList;
                }
            } else {
                if( homeView.ciudad != 0 ) {
                    // filtra x categoria y x ciudad
                    this.eventosCateg = new EventoCollection(this.eventosList.where({id_categoria: homeView.categoria, id_ciudad: homeView.ciudad}));
                } else {
                    // filtra solo x categoria
                    this.eventosCateg = new EventoCollection(this.eventosList.where({id_categoria: homeView.categoria}));
                }
            }
            
            console.log("imprime listacategoria");
            console.log(this.eventosCateg);
            //console.log(JSON.stringify(this.eventosCateg));
            
            homeView.model = this.eventosCateg;
            homeView.render();
        },
        
        ciudad: function (id_ciudad) {
            
            homeView.ciudad = id_ciudad;
            
            console.log('categ: '+homeView.categoria);
            console.log('ciudad: '+homeView.ciudad);
            
            if (homeView.categoria == 0) {
                if( homeView.ciudad != 0 ) {
                    // filtra solo x por ciudad
                    this.eventosCiudad = new EventoCollection(this.eventosList.where({id_ciudad: homeView.ciudad}));
                } else {
                    // coge todas las categorías, vuelve a mostrar la lista inicial
                    this.eventosCiudad = this.eventosList;
                }
            } else {
                if( homeView.ciudad != 0 ) {
                    // filtra x categoria y x ciudad
                    this.eventosCiudad = new EventoCollection(this.eventosList.where({id_categoria: homeView.categoria, id_ciudad: homeView.ciudad}));
                } else {
                    // filtra solo x categoria
                    this.eventosCiudad = new EventoCollection(this.eventosList.where({id_categoria: homeView.categoria}));
                }
            }
            
            console.log("imprime listaciudad");
            console.log(this.eventosCiudad);
            //console.log(JSON.stringify(this.eventosCateg));
            
            homeView.model = this.eventosCiudad;
            homeView.render();
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

    $(document).ready( function() { console.log("document ready"); });
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
    // PhoneGap esta listo y ahora ya se pueden hacer llamadas a PhoneGap
    function onDeviceReady() {
        console.log('onDeviceReady se ejecutó');
        console.log(navigator);
        
        // eliminar delay 300ms
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
        
        // Now safe to use device APIs
        /*setTimeout(function() {
            navigator.splashscreen.hide();
        }, 5000);*/
    }
    
    
    

    /* ---------------------------------- Local Functions ---------------------------------- */

}());