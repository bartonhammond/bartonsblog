// Define an object type by dragging together attributes

Template.carouselSortable.helpers({
  carousel: function () {
    return Session.get('carouselImgUrls') ;
  }
});

Template.sortableItemTarget.events({
  'dblclick .desc': function (event, template) {
    // Make the name editable. We should use an existing component, but it's
    // in a sorry state - https://github.com/arillo/meteor-x-editable/issues/1
    var desc = template.$('.desc');
    var input = template.$('input');
    if (input.length) {  // jQuery never returns null - http://stackoverflow.com/questions/920236/how-can-i-detect-if-a-selector-returns-null
      input.show();
    } else {
      input = $('<input class="form-control" type="text" placeholder="' + this.desc + '" style="display: inline" maxlength="35">');
      desc.after(input);
    }
    desc.hide();
    input.focus();
  },
  'blur input[type=text]': function (event, template) {
    // commit the change to the name, if any
    var input = template.$('input');
    var order = this.order;
    input.hide();
    template.$('.desc').show();
    // TODO - what is the collection here? We'll hard-code for now.
    // https://github.com/meteor/meteor/issues/3303
    if (this.desc !== input.val() && this.desc !== '') {
      //order
      var imgs = Session.get('carouselImgUrls') ;
      imgs[order].desc = input.val();
      Session.set('carouselImgUrls',imgs);
      console.log('new desc: ' + input.val());
    }
  },
  'keydown input[type=text]': function (event, template) {
    if (event.which === 27) {
      // ESC - discard edits and keep existing value
      template.$('input').val(this.desc);
      event.preventDefault();
      event.target.blur();
    } else if (event.which === 13) {
      // ENTER
      event.preventDefault();
      event.target.blur();
    }
  }
});

