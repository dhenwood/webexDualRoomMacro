import xapi from 'xapi';

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'microphone'){
      if ((event.Type == 'pressed') && (event.Value == "room")){
        roomMic();
      }else if ((event.Type == 'pressed') && (event.Value == "lecturn")){
        lecturnMic();
      }
    }
});

function roomMic(){
  xapi.command('Audio LocalOutput DisconnectInput', {"InputId":148, "OutputId":149 })
}

function lecturnMic(){
  xapi.command('Audio LocalOutput ConnectInput', {"InputId":148, "OutputId":149 })
}
