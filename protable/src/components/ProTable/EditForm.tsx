import React from 'react';
import type { IFormLayoutProps } from '@formily/antd-v5';
import { FormLayout, FormDrawer, Submit, Reset, FormButtonGroup } from '@formily/antd-v5';
import type { ISchema } from '@formily/react';
import { SchemaField } from '../SchemaField'
export interface EditFormProps extends IFormLayoutProps {
  schema: ISchema;
}

const EditForm: React.FC<EditFormProps> = ({ schema, ...props }) => {
  return (
    <FormLayout {...props} labelWidth={150}>
      <SchemaField schema={JSON.parse(schema!)} />
      <FormDrawer.Footer>
        <FormButtonGroup>
          <Submit
            onSubmit={() => {
              return new Promise((resolve) => {
                setTimeout(resolve, 1000);
              });
            }}
          >
            提交
          </Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </FormDrawer.Footer>
    </FormLayout>
  );
};

export default EditForm;
