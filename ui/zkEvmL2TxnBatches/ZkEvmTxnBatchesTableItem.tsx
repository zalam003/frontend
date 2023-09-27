import { Td, Tr, Text, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { ZkEvmL2TxnBatchesItem } from 'types/api/zkEvml2TxnBatches';

// import { route } from 'nextjs-routes';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import BlockEntityL2 from 'ui/shared/entities/block/BlockEntityL2';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import LinkInternal from 'ui/shared/LinkInternal';

const feature = config.features.rollup;

type Props = { item: ZkEvmL2TxnBatchesItem; isLoading?: boolean };

const TxnBatchesTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = dayjs(item.timestamp).fromNow();

  if (!feature.isEnabled) {
    return null;
  }

  return (
    <Tr>
      <Td>
        <BlockEntityL2
          isLoading={ isLoading }
          number={ item.number }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
        />
      </Td>
      <Td>
        <LinkInternal
          // href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: item.l2_block_number.toString(), tab: 'txs' } }) }
          href="#"
          isLoading={ isLoading }
        >
          <Skeleton isLoaded={ !isLoading } minW="40px" my={ 1 }>
            { item.tx_count }
          </Skeleton>
        </LinkInternal>
      </Td>
      <Td pr={ 12 }>
        { item.sequence_tx_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.sequence_tx_hash }
            fontSize="sm"
            lineHeight={ 5 }
            maxW="100%"
          />
        ) : <Text>pending</Text> }
      </Td>
      <Td>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" my={ 1 } display="inline-block">
          <span>{ timeAgo }</span>
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default TxnBatchesTableItem;
