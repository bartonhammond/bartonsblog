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

UI.registerHelper("isActiveRoute", function(routeName){
  if (!_.isUndefined(Router.current().route)) {
    return Router.current().route.getName() === routeName ? 'active' : '';
  } else {
    return '';
  }
});
