Template.previews.helpers({
  files: function() {
    var _files = [];
    for (var i =0; i < this.files.length; i++) {
      _files.push(this.files[i]);
    }
    return _files;
  }
});



Template.previews.created = function() {
  this.data.filesProcessed = 0;
  var _self = this;
  
  _self.data.previewsListener = function(e) {
    _self.data.filesProcessed++;
    if (_self.data.filesProcessed >= _self.data.files.length) {
      e.ezModal.modal('hide');
    }
  };
  
  Event.on('summernoteImageUploadComplete', _self.data.previewsListener);
}

Template.previews.destroyed = function() {
  var _self = this;
  Event.removeListener('summernoteImageUploadComplete', _self.data.previewsListener);
}


Template.preview.created = function() {
  this.templatedata = new ReactiveDict();
  this.templatedata.set('dz-complete',false);
  this.templatedata.set('dz-success',false);
  var _self = this;

  _self.data.previewListener = function(e) {
    if (e.data.fileName == _self.data.fileName) {
      _self.templatedata.set('dz-complete',true);
      Meteor.setTimeout(function() {
        _self.templatedata.set('dz-success',true);
      }, 500);
    }
  };
  Event.on('summernoteImageUploadComplete', _self.data.previewListener);
}


Template.preview.destroyed = function() {
  var _self = this;
  Event.removeListener('summernoteImageUploadComplete', _self.data.previewListener);
}

Template.preview.rendered = function() {
  var file    = this.data;
  var reader  = new FileReader();
  var that = this;
  reader.onloadend = function () {
    that.templatedata.set('previewSrc', reader.result);
  }

  reader.readAsDataURL(file);

};
Template.preview.helpers({
  src: function() {
    var tmpl = UI._templateInstance();
    return tmpl.templatedata.get('previewSrc');
  },
  fileName: function() {
    var tmpl = UI._templateInstance();
    return tmpl.data.name;
  },
  dzComplete: function() {
    var tmpl = UI._templateInstance();
    return tmpl.templatedata.get('dz-complete') ? 'dz-complete' : '';
  },
  dzSuccess: function() {
    var tmpl = UI._templateInstance();
    return tmpl.templatedata.get('dz-success') ? 'dz-success' : '';
  },
  mb: function() {
    var tmpl = UI._templateInstance();
    var fileSizeInBytes = tmpl.data.size;
    // Convert the bytes to Kilobytes (1 KB = 1024 Bytes)
    var fileSizeInKB = fileSizeInBytes / 1024;
    // Convert the KB to MegaBytes (1 MB = 1024 KBytes)
    var fileSizeInMB = fileSizeInKB / 1024;
    var rounded = Math.round( fileSizeInMB * 10 ) / 10;
    return rounded;
  }
});
