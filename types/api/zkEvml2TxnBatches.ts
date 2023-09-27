export type ZkEvmL2TxnBatchesItem = {
  number: number;
  sequence_tx_hash: string;
  timestamp: string;
  tx_count: number;
}

export type ZkEvmL2TxnBatchesResponse = {
  items: Array<ZkEvmL2TxnBatchesItem>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
