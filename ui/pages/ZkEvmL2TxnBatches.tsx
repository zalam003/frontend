import { Box, Hide, Show, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { generateListStub } from 'stubs/utils';
import { ZKEVM_L2_TXN_BATCHES_ITEM } from 'stubs/zkEvmL2';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import ZkEvmTxnBatchesListItem from 'ui/zkEvmL2TxnBatches/ZkEvmTxnBatchesListItem';
import ZkEvmTxnBatchesTable from 'ui/zkEvmL2TxnBatches/ZkEvmTxnBatchesTable';

const ZkEvmL2TxnBatches = () => {
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'zkevm_l2_txn_batches',
    options: {
      placeholderData: generateListStub<'zkevm_l2_txn_batches'>(
        ZKEVM_L2_TXN_BATCHES_ITEM,
        50,
        {
          next_page_params: {
            items_count: 50,
            block_number: 9045200,
          },
        },
      ),
    },
  });

  const countersQuery = useApiQuery('zkevm_l2_txn_batches_count', {
    queryOptions: {
      placeholderData: 5231746,
    },
  });

  const content = data?.items ? (
    <>
      <Show below="lg" ssr={ false }>
        { data.items.map(((item, index) => (
          <ZkEvmTxnBatchesListItem
            key={ item.number + (isPlaceholderData ? String(index) : '') }
            item={ item }
            isLoading={ isPlaceholderData }
          />
        ))) }
      </Show>
      <Hide below="lg" ssr={ false }><ZkEvmTxnBatchesTable items={ data.items } top={ pagination.isVisible ? 80 : 0 } isLoading={ isPlaceholderData }/></Hide>
    </>
  ) : null;

  const text = (() => {
    if (countersQuery.isError || isError || !data?.items.length) {
      return null;
    }

    return (
      <Skeleton isLoaded={ !countersQuery.isPlaceholderData && !isPlaceholderData } display="flex" flexWrap="wrap">
        Tx batch
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[0].number } </Text>to
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[data.items.length - 1].number } </Text>
        (total of { countersQuery.data?.toLocaleString() } batches)
      </Skeleton>
    );
  })();

  const actionBar = (
    <>
      <Box mb={ 6 } display={{ base: 'block', lg: 'none' }}>
        { text }
      </Box>
      <ActionBar mt={ -6 } alignItems="center">
        <Box display={{ base: 'none', lg: 'block' }}>
          { text }
        </Box>
        { pagination.isVisible && <Pagination ml="auto" { ...pagination }/> }
      </ActionBar>
    </>
  );

  return (
    <>
      <PageTitle title="Tx batches" withTextAd/>
      <DataListDisplay
        isError={ isError }
        items={ data?.items }
        emptyText="There are no tx batches."
        content={ content }
        actionBar={ actionBar }
      />
    </>
  );
};

export default ZkEvmL2TxnBatches;
