import React, { useEffect } from 'react'
import { createForm, isField, onFieldInit, onFieldValueChange, onFormSubmitSuccess } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormButtonGroup, FormItem, Input, Radio, Submit } from '@formily/antd'
import { Tabs, Card, Select, Checkbox, Switch, InputNumber, Button } from 'antd'
import { observer, inject } from "mobx-react";
const App = observer(({ v2Store }: any) => {
    const form = createForm({
        validateFirst: true,
        effects() {
            onFieldValueChange('type', (field: any) => {
                console.log('target已初始化', field)
                if (isField(field)) {
                    form.setFieldState("project", (state: any) => {
                        state.hidden = (field.value != "项目专属");
                    })
                }
            });
            onFieldValueChange('count', (field: any) => {
                if (isField(field)) {
                    v2Store.setCount(field.value)
                }
            });
            onFormSubmitSuccess((field) => {
                console.log(field.values)
            })
        },
        initialValues: {
            count: v2Store.count
        }
    })

    useEffect(() => {
        form.setFieldState("count", (state: any) => {
            state.value = v2Store.count;
        })
    }, [v2Store.count]);

    return (<>
        <Switch
            checkedChildren="隐藏"
            unCheckedChildren="显示"
            onChange={(checked) => {
                form.setFieldState("content", (state: any) => {
                    state.hidden = checked;
                })
            }}
            style={{ margin: "20px" }} />
        <Form
            form={form}
            onAutoSubmit={console.log}
        >
            <Field
                name="username"
                title="标题"
                required
                decorator={[FormItem]}
                component={[Input]}
            />
            <Field
                name="count"
                title="周期"
                required
                decorator={[FormItem]}
                component={[InputNumber]}
            />
            <Field
                name="type"
                title="适用范围"
                required
                decorator={[FormItem]}
                component={
                    [Radio.Group, {
                        options: [
                            { label: "通用", value: "通用" },
                            { label: "项目专属", value: "项目专属" },
                        ]
                    }]
                }
            />
            <Field
                name="project"
                title="项目"
                required
                hidden
                decorator={[FormItem]}
                component={[Select, {
                    options: [
                        { label: "项目1", value: "项目1" },
                        { label: "项目2", value: "项目2" },
                    ]
                }]}
            />
            <Field
                name="content"
                title="备注"
                decorator={[FormItem]}
                component={[Input.TextArea]}
            />
            <FormButtonGroup.FormItem>
                <Submit block size="large">
                    提交
                </Submit>
            </FormButtonGroup.FormItem>
        </Form>
    </>)
})

export default inject(store => store)(App); 