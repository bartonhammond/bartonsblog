UI.registerHelper('checkedIf', function(val) {
  return val ? 'checked' : '';
});

UI.registerHelper('showDate', function(val) {
  if (!val) return '';
  return moment(new Date(val.toISOString())).format('MMMM Do YYYY');
});

UI.registerHelper('showEditableDate', function(val) {
  if (!val) return '';
  return moment(new Date(val.toISOString())).format('MM/DD/YYYY');
});
