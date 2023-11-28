import React from 'react';
import { FormItem, FormLayout, Input } from '@formily/antd-v5';
import type { ISchema } from '@formily/react';
import { createSchemaField } from '@formily/react';
import { DetailTable } from '@/components/ProTable';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    DetailTable,
  },
});

const EditForm: React.FC = () => {
  const editSchema: ISchema = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        'x-hidden': true,
      },
      code: {
        type: 'string',
        title: '编号',
        'x-editable': false,
        'x-component': 'Input',
        'x-decorator': 'FormItem',
      },
      name: {
        type: 'string',
        title: '名称',
        required: true,
        'x-component': 'Input',
        'x-decorator': 'FormItem',
        'x-reactions': {
          target: 'description',
          fulfill: {
            state: {
              readOnly: '{{$self.value}}',
            },
          },
        },
      },
      description: {
        type: 'string',
        title: '描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          style: {
            height: 50,
          },
        },
      },
      fields: {
        type: 'array',
        title: '字段',
        'x-component': 'DetailTable',
        'x-decorator': 'FormItem',
        'x-component-props': {
          showAction: true,
          showDelete: false,
          columns: [
            {
              title: '字段名',
              dataIndex: 'field',
              with: 100,
              ellipsis: true,
            },
            {
              title: '显示名',
              dataIndex: 'displayName',
              with: 150,
              ellipsis: true,
            },
            {
              title: '排序',
              dataIndex: 'sort',
              width: 100,
              ellipsis: true,
              align: 'right',
              sorter: (a: any, b: any) => a.sort - b.sort,
            },
            {
              title: '状态',
              dataIndex: 'hidden',
              width: 60,
              renderText: (val: boolean) => {
                return !val ? '显示' : '隐藏';
              },
            },
          ],
          editSchema: JSON.stringify({
            type: 'object',
            properties: {
              id: {
                type: 'string',
                'x-hidden': true,
              },
              field: {
                type: 'string',
                title: '字段名',
                required: true,
                'x-editable': false,
                'x-component': 'Input',
                'x-decorator': 'FormItem',
              },
              displayName: {
                type: 'string',
                title: '显示名',
                required: true,
                'x-component': 'Input',
                'x-decorator': 'FormItem',
              },
              fieldType: {
                type: 'string',
                title: '字段类型',
                'x-editable': false,
                'x-component': 'Select',
                'x-decorator': 'FormItem',
                enum: [
                  {
                    label: '文本',
                    value: 0,
                  },
                  {
                    label: '日期',
                    value: 1,
                  },
                  {
                    label: '数字',
                    value: 2,
                  },
                  {
                    label: '布尔',
                    value: 3,
                  },
                  {
                    label: '空',
                    value: 4,
                  },
                ],
              },
              editorType: {
                type: 'string',
                title: '编辑器',
                'x-component': 'Select',
                'x-decorator': 'FormItem',
              },
              required: {
                type: 'boolean',
                title: '必填',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              readonly: {
                type: 'boolean',
                title: '只读',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              allowFilter: {
                type: 'boolean',
                title: '允许过滤',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              hidden: {
                type: 'boolean',
                title: '隐藏',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              showInListTable: {
                type: 'boolean',
                title: '显示在列表',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              editable: {
                type: 'boolean',
                title: '允许编辑',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              isStatic: {
                type: 'boolean',
                title: '内置',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-reactions': {
                  target: 'displayName',
                  fulfill: {
                    state: {
                      readOnly: '{{$self.value}}',
                    },
                  },
                },
              },
              permission: {
                type: 'string',
                title: '权限',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
              },
              sort: {
                type: 'string',
                title: '排序',
                'x-component': 'NumberPicker',
                'x-decorator': 'FormItem',
              },
            },
          }),
        },
      },
    },
  };
  return (
    <FormLayout labelCol={4}>
      <SchemaField schema={editSchema} />
    </FormLayout>
  );
};

export default EditForm;
