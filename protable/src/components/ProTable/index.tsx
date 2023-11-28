import { connect, mapProps, mapReadPretty } from '@formily/react';
import Table, { DetailTablePreview } from './Table';

export const DetailTable = connect(
  Table,
  mapProps({
    value: 'dataSource',
  }),
  mapReadPretty(DetailTablePreview),
);
