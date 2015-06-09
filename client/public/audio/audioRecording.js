var audioContext;
var audioRecorder;
var _realAudioInput;


function handlerStartUserMedia(stream) {
  // MEDIA STREAM SOURCE -> ZERO GAIN >
  _realAudioInput = audioContext.createMediaStreamSource(stream);
  audioRecorder = new Recorder(_realAudioInput, function(blob) {
    BinaryFileReader.read(blob, function(err, fileInfo){
      var audio = {
        uuid: Session.get('UUID'),
        blob: fileInfo,
        blobURL: window.URL.createObjectURL(blob),
        submitted: new Date(),
      };
      Audios.insert(audio);
    });

  });
}

function handlerErrorUserMedia(e) {
  console.log('No live audio input: ', e);
}

/**
 * When DOM is ready.  This causes the page to ask for Microphone permissions
 */
Template.audioRecording.rendered = function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
  
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
  window.URL = window.URL || window.webkitURL;
  
  audioContext = new AudioContext;
  
  navigator.getUserMedia({video:false, audio: true}, handlerStartUserMedia, handlerErrorUserMedia);
};

Template.audioRecording.events({
  'click #startRecordingBtn': function(e) {
    if(!audioRecorder)
      return;
    
    audioRecorder && audioRecorder.record();

    //GUI - setup reactive in Session so buttons work together
  },
  'click #stopRecordingBtn': function(e, tmpl) {
    if(!audioRecorder)
      return;
    audioRecorder && audioRecorder.stop();
    Session.set('formChanged',true);
  },
  'click .close': function (event, template) {
    var _self = this;
    if (_.isUndefined(Router.current().params._id)) {
      Audios.remove(_self._id);   
    } else {
      Meteor.call('removeAudio', _self, function(error, result) {
        Audios.remove(this._id);   
      });
    }
  }
});

Template.audioRecording.helpers({
  audios: function() {
    return Audios.find();
  },
  url: function() {
    var _self = this;
    if (_.isUndefined(_self.mp3URL)) {
      return _self.blobURL;
    } else {
      return _self.mp3URL;
    }
  }
});
