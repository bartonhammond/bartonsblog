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
  'click #saveAudio': function(e, tmpl) {
    var _self = this;
    var blob = new Blob([_self.blob.file],{type: _self.blob.type});

    var metaContext = {_id: _self.id, uuid: _self.uuid};
    var myAudioUploader = new Slingshot.Upload("myAudioUploads", metaContext);

    var ezModal = EZModal({
      size: 'sm',
      classes: 'text-center',
      body: 'Saving audio to cloud...this may take a few moments',
      hideFooter: true
    });

    myAudioUploader.send(blob, function (error, downloadUrl) {
      ezModal.modal('hide');
      if (!error) {
        Audios.update(
          {_id: _self._id}, 
          {$set:
           { mp3URL: downloadUrl}
          });
      }//error
    });
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
  },
  notSavedToMP3: function() {
    var _self = this;
    return _.isUndefined(_self.mp3URL);
  }
});
