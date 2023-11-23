// @ts-nocheck
"use client";
import React from "react";
import {
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
  Input,
  NumberPicker,
  Space,
} from "@formily/antd";

import { createForm, Field } from "@formily/core";
import {
  FormProvider,
  createSchemaField,
  Schema,
  SchemaPatch,
} from "@formily/react";
import { action } from "@formily/reactive";
import { toArray } from "@formily/reactive/esm/array";

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
    Input,
    NumberPicker,
  },
});

interface RequestSchema {
  host: string;
  method: string;
}

const transform = (data = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === "string")
      return buf.concat({
        label: value,
        value: key
      });
    const { name, code, cities, districts } = value;
    const _cities = transform(cities);
    const _districts = transform(districts);
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length
        ? _cities
        : _districts.length
          ? _districts
          : undefined
    });
  }, []);
};


function loadData(reqSchema: RequestSchema) {
  return async (field: Field) => {
    const resp = await fetch(reqSchema.host, { method: reqSchema.method });
    return await resp.json();
  };
}


const useAsyncValue = (service: any) => (field: Field) => {
  field.loading = true;
  service(field).then(
    action.bound?.((data: any) => {
      field.value = data;
      field.loading = false;
    }),
  );
};

const form = createForm();

const schema = {
  type: "object",
  properties: {
    cluster: {
      type: "string",
      title: "机房",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        style: {
          width: 120,
        },
      },
      "x-request": {
        host: "https://unpkg.com/china-location/dist/location.json",
        method: "GET",
      },
    },
  },
};

const PageDemo = () => {

  const useAsyncDataSource = (reqPatch) => (field: Field) => {
    console.log('field:', field.mounted)
    if (field.mounted) return;
    field.loading = true;
    fetch(reqPatch.host)
      .then((res) => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data);
          field.loading = false;
        })
      );
  };

  // 如果x-reactions存在依赖，则只能放在fulfill的run中，但是run字段是个字符串，不支持函数，没法将x-request给透传进去
  const reqPatch: SchemaPatch = (schema: any) => {
    console.log("schema：", schema);
    const req = schema["x-request"];
    if (!req) {
      return schema;
    }
    console.log('reactions')
    return {
      ...schema,
      "x-reactions": [
        ...toArray(schema["x-reactions"]),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useAsyncDataSource(req),
      ],
    };
  };

  Schema.registerPatches(reqPatch);
  return (
    <FormProvider form={form}>
      <Space>
        <SchemaField
          schema={schema}
          scope={{
            useAsyncValue,
            useAsyncDataSource,
            loadData,
          }}
        />
        <FormButtonGroup>
          <Submit onSubmit={console.log}>
            <div>提交</div>
          </Submit>
        </FormButtonGroup>
      </Space>
    </FormProvider>
  );
};

export default PageDemo