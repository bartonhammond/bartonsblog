Template.comment.helpers({
  submittedText: function() {
    return moment(new Date(this.submitted.toISOString())).format('dddd MMMM Do YYYY'); 
  }
})
