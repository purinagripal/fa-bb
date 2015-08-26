var EventoListItemView = Backbone.View.extend({

    render:function () {
        /*console.log('evento-model');
        console.log(JSON.stringify(this.model));*/
        $(this.el).html(this.template(this.model.toJSON()));
        return this; // enable chained calls
    }
    
});