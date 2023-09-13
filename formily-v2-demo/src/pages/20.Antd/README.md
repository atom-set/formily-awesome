### antd最小组件间的关系

#### createForm 方法
- 初始化操作
> 初始化 Form 模型: https://core.formilyjs.org/zh-CN/api/models/form
> 构建 FormPath: Graph
> 初始化心方法: Heart

- 定义领域模型，指响应式行为
> makeObservable: https://reactive.formilyjs.org/zh-CN/api/define

- 监听 observable 对象的所有操作
> observe: https://reactive.formilyjs.org/zh-CN/api/observe

- 初始化表单的受控值属性和初始值属性
> getValidFormValues: https://v1.formilyjs.org/#/0yTeT0/0eSpSBTYIX

- 触发Form生命周期
> ON_FORM_INIT

form 对象传给了 FormProvider

#### FormProvider 组件
- 引入 useAttach 钩子，将 target 标记为 mounted

#### Field 组件
- form.createField 方法初始化 Filed 模型: https://core.formilyjs.org/zh-CN/api/models/field
- 定义领域模型，指响应式行为
- 监听 observable 对象的所有操作
- 触发Field生命周期事件
- 引入 useAttach 钩子

#### ReactiveField
- 获取Filed 属性，进行渲染
- observer该组件: 每次视图重新渲染就会收集依赖，依赖更新会自动重渲染


## TODO
### 支持二次封装

### 支持阅读态
