import React from 'react';
import { Anchor } from 'ual-anchor';
import { UALProvider } from 'ual-reactjs-renderer';
import Navbar from 'src/components/Navbar';
import ChatContainer from 'src/components/ChatContainer';
import ChatInputBar from 'src/components/ChatInputBar';
import 'src/App.css';

type Props = {
  appName: string;
  version: string;
};

const App: React.FC<Props> = (props) => {
  const chain = {
    "chainId": "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    "name": "WAX",
    "rpcEndpoints": [
      {
        "protocol": "https",
        "host": "wax.greymass.com",
        "port": 443
      }
    ]
  };

  const getAuthenticators = () => {
    const anchor = new Anchor([ chain ], {
      appName: props.appName,
    });
    return [
      anchor
    ];
  };

  const authenticators = getAuthenticators();

  return (
    <div className="App">
      <Navbar version={props.version} />
      <ChatContainer />
      <UALProvider
        appName={props.appName}
        authenticators={authenticators}
        chains={[chain]}
        key={chain.chainId}
      >
        <ChatInputBar />
      </UALProvider>
    </div>
  );
}

export default App;
