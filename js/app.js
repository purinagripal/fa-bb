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