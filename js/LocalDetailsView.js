var LocalDetailsView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        
        //console.log("con this.el");
        //console.log($('#map-canvas', this.el)[0]);
        
        var datosModelo = this.model.attributes;
        
        var div_canvas = $('#map-canvas', this.el)[0];
        
        myLatlng = new google.maps.LatLng(28.6739669, -13.95281); 
        var mapOptions = { 
            zoom: 14, 
            center: myLatlng
        }; 
        var map = new google.maps.Map(div_canvas, mapOptions);
        var marker = new google.maps.Marker({ 
            position: myLatlng, 
            map: map, 
            title: datosModelo.title 
        });

        console.log(this.model);
        
        return this;
    },
    
    events: {
    }
    
});