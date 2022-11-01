import logo from './logo.svg';
import './App.css';

import {Wampy} from 'wampy';
import w3cws from 'websocket';
import {JsonSerializer} from "wampy/dist/serializers/JsonSerializer";
import {useState} from "react";

export const baglan= new Wampy('ws://localhost:9000/test', {
  debug: true,
  realm: ('realm1'),
  serializer: new JsonSerializer(),
  wss: w3cws,
  onConnect: () => {
    console.log('Connected to router!');
    baglan.register('kulllanıcı', {
      rpc: () => {
        return { argsList: 'hello' };
      },
      onSuccess: () => {
        console.log('Registered RPC!');
      }
    });
  },
  onError: (e) => {
    console.log('Error!', e);
  },
  onClose:()=>{
    console.log('See you next time!')
  },
  onEvent: function (data) {
    console.log(data);
  }
})

export async function data (){
  await baglan.subscribe('kanal1',
      function (eventData) {
        console.log('Received new chat message!', eventData);
  });

  try {
    let res = await baglan.subscribe('kanal1',
        function (eventData) { console.log('Received : ', eventData); }
    );
    console.log('Successfully subscribed to topic: ' + res.topic);

  } catch (e) {
    console.log('Subscription error:' + e.error);
  }
}

function App() {

  data()


      return (
    <div className="App">
      <header className="App-header">

        <button onClick={()=>baglan.connect()}> Bağlan</button>
        <button onClick={()=>baglan.disconnect()}> Bağlantıyı Kes</button>
        <button onClick={()=>data()}> Kanal 1 Dinle </button>
      </header>
    </div>
  );
}

export default App;
