// Define an object type by dragging together attributes

Template.carouselSortable.helpers({
  carousel: function () {
    return CarouselImages.find({uuid: Session.get('UUID')}, {
      sort: {order: 1}
    });
  },
  carouselOptions: {
    // event handler for reordering attributes
    onSort: function (event) {
      console.log('Item %s went from #%d to #%d',
                  event.data.name, event.oldIndex, event.newIndex
                 );
    },
    // Element is removed from the list into another list
    onRemove: function (evt) {
      console.log(evt);
    }
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

    if (this.desc !== input.val() && this.desc !== '') {
      CarouselImages.update(this._id, {$set: {desc: input.val()}});
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
  },
  'click .copyURL': function (event, template) {
    Session.set('copyURL', this.url);
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.success('copied');
  }
  
});

// you can add events to all Sortable template instances
Template.sortable.events({
  'click .close': function (event, template) {
    // `this` is the data context set by the enclosing block helper (#each, here)
    template.collection.remove(this._id);
  }
});
