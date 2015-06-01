Template.blogForm.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip();
  var _self = this;
  $('#fromDate').datepicker();
  $('#toDate').datepicker();
  var $summernote = $('#summernote');
  $summernote.summernote({
    width: '100%',
    height: '300px',
    focus: true,
    toolbar:[
      ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
      ['color', ['color']],
      ['font', ['bold', 'underline', 'clear']],
      ['para', ['ul','ol', 'paragraph']],
      ['insert', ['link', 'table', 'hr']]
    ],
    onImageUpload: function(files) {

      var ezModal = EZModal({
        size: 'lg',
        classes: 'text-center',
        bodyTemplate: 'previews',
        dataContext: {files: files},
        hideFooter: true
      });

      for (var i = 0; i < files.length; i++) {
        uploadDescriptionImage(files[i], $summernote, ezModal);
      };
    },//onImageUpload
    onInit: function() {
      if (Router.current().params) {
        var timer = Meteor.setInterval(function() {
          if (_self.data.description) {
            $summernote.code(_self.data.description);
            Meteor.clearTimeout(timer);
          }
          
        }, 300);
      }
    }
  });
}
                        

Template.blogForm.helpers({
  errorMessage: function(field) {
    return Session.get('blogSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('blogSubmitErrors')[field] ? 'has-error' : '';
  }
});
