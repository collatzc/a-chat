import React from 'react';
import { User, Authenticator } from 'universal-authenticator-library';

interface RpcEndpoint {
  protocol: string;
  host: string;
  port: number;
}

interface Chain {
  chainId: string;
  rpcEndpoints: RpcEndpoint[];
}

interface UAL {
  chains: Chain[];
  authenticators: Authenticator[];
  availableAuthenticators: any[];
  activeUser: User;
  activeAuthenticator: Authenticator;
  appName: string;
  key: string;
  showModal: Function;
}

// declare module 'ual-reactjs-renderer';
declare module 'ual-reactjs-renderer' {
  export interface UALProps {
    ual: UAL;
  }
  export const UALProvider: React.Component<UALProps>;
  export const withUAL: Function;
}

export type { Chain, UAL }
