import React from 'react';
import Navbar from 'src/components/Navbar';
import ChatContainer from 'src/components/ChatContainer';
import ChatInputBar from 'src/components/ChatInputBar';
import 'src/App.css';

type Props = {
  appName: string;
  version: string;
};

const App: React.FC<Props> = (props) => {
  return (
    <div className="App">
      <Navbar version={props.version} />
      <ChatContainer />
      <ChatInputBar />
    </div>
  );
}

export default App;
