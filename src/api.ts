import { JsonRpc }from 'eosjs';

const tableName = 'messages';
const rpc = new JsonRpc(`https://wax.greymass.com`);

export const getTableRows = (scope: string, lastId: number) => {
  const _index = lastId === -1 ? 0 : lastId + 1;
  return rpc.get_table_rows({
    json: true,
    code: 'chatexample1',
    scope: scope,
    index_position: 1,
    lower_bound: _index,
    table: tableName,
    limit: 100
  });
};

export const getActions = (pos: number) => {
  return rpc.history_get_actions('chatexample1', pos, -1);
};

