import { useMemo, useRef } from 'react';
import type {
  ProTableProps,
  ActionType,
  ProCoreActionType,
  PageInfo,
} from '@ant-design/pro-components';
import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header';
import { ProTable } from '@ant-design/pro-components';
import { TableAction } from '@/components/TableAction';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ISchema } from '@formily/react';
import { useField } from '@formily/react';
import EditForm from './EditForm';
import { FormDrawer } from '@formily/antd-v5';
import { cloneDeep } from 'lodash';
import type { Form } from '@formily/core';

export type DetailTableProps = ProTableProps<any, undefined> & {
  showAction?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
  editSchema?: ISchema;
  onChange?: (dataSource: any[]) => void;
  editFormEffects?: (form: Form<any>) => void;
};

const DetailTable: React.FC<DetailTableProps> = ({
  columns,
  dataSource,
  showAction,
  showAdd,
  showDelete,
  showEdit,
  editSchema,
  onChange,
  editFormEffects,
}) => {
  const actionRef = useRef<ActionType>();

  function handleEdit(index: number, data: any, pageInfo?: PageInfo) {
    FormDrawer(
      { title: index === -1 ? '新增' : '编辑', width: 500, destroyOnClose: true },
      'editDetail',
      () => <EditForm schema={editSchema!} />,
    )
      .forOpen((_, next) => {
        next({ initialValues: { ...data }, effects: editFormEffects });
      })
      .open()
      .then((x) => {
        if (dataSource) {
          const newDatas = cloneDeep(dataSource) as any[];
          if (index === -1) {
            newDatas.push(x);
          } else {
            const dataIndex = ((pageInfo?.current || 1) - 1) * (pageInfo?.pageSize || 10) + index;
            newDatas[dataIndex] = x;
          }
          console.log(x, newDatas);
          onChange?.(newDatas);
        } else {
          onChange?.([x]);
        }
        actionRef.current?.reload();
      });
  }
  function handleDelete(index: number, pageInfo?: PageInfo) {
    const newDatas = cloneDeep(dataSource) as any[];
    const dataIndex = ((pageInfo?.current || 1) - 1) * (pageInfo?.pageSize || 10) + index;
    newDatas.splice(dataIndex, 1);
    onChange?.(newDatas);
  }

  const { components, resizableColumns, tableWidth } = useAntdResizableHeader<any>({
    columns: useMemo(() => {
      if (showAction) {
        return [
          ...(columns || []),
          {
            title: '操作',
            width: 180,
            fixed: 'right',
            valueType: 'option',
            key: 'option',
            render: (_: any, record: any, index: any, action: ProCoreActionType) => (
              <TableAction
                menus={[
                  {
                    text: '编辑',
                    key: 'edit',
                    ifShow: showEdit,
                    onClick: () => handleEdit(index, record, action.pageInfo),
                  },
                  {
                    text: '删除',
                    danger: true,
                    key: 'delete',
                    ifShow: showDelete,
                    confirm: {
                      title: '是否继续?',
                      description: '删除后无法恢复！',
                      onConfirm: () => handleDelete(index, action.pageInfo),
                    },
                  },
                ]}
              />
            ),
          },
        ];
      } else {
        return columns;
      }
    }, []),
  });
  return (
    <ProTable
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
      defaultSize="small"
      rowKey="id"
      dataSource={dataSource}
      actionRef={actionRef}
      columns={resizableColumns}
      components={components}
      scroll={{ x: tableWidth }}
      search={false}
      toolbar={{
        settings: undefined,
      }}
      headerTitle={
        showAdd && (
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              handleEdit(-1, {});
            }}
            type="primary"
            ghost
            size="small"
          >
            新建
          </Button>
        )
      }
    />
  );
};
const DetailTablePreview: React.FC<DetailTableProps> = ({ columns }) => {
  const field = useField();
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader<any>({
    columnsState: {
      persistenceKey: 'base_product_list',
      persistenceType: 'localStorage',
    },
    columns: useMemo(() => columns, []),
  });
  return (
    <ProTable
      defaultSize="small"
      rowKey="id"
      dataSource={field.data}
      columns={resizableColumns}
      components={components}
      scroll={{ x: tableWidth }}
    />
  );
};
export { DetailTablePreview };
export default DetailTable;
