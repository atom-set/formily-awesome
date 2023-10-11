### 临时变量对象
- `export const ProxyRaw = new WeakMap()`
  - 代理对象: K-代理对象、V-元数据
- `export const RawProxy = new WeakMap()`
  - 代理对象: K-元数据、V-代理对象
- `export const RawShallowProxy = new WeakMap()`
  - 代理对象: K-代理对象、V-元数据
- `export const RawNode = new WeakMap<object, DataNode>()`
  - Map对象: K-元数据、V-DataNode对象
- `export const RawReactionsMap = new WeakMap<object, ReactionsMap>()`
  - reactionsMap对象: K-元数据、V-reaction对象
- `export const ReactionStack: Reaction[] = []`
- 数据对象: 存放 reaction 函数的堆栈
- `export const BatchCount = { value: 0 }`
  - batch次数
- `export const UntrackCount = { value: 0 }`
  - 未被跟踪的次数
- `export const BatchScope = { value: false }`

- `export const DependencyCollected = { value: false }`
  - 是否存在被收集的依赖

- `export const PendingReactions = new ArraySet<Reaction>()`
  - 
- `export const PendingScopeReactions = new ArraySet<Reaction>()`
  - 
- `export const BatchEndpoints = new ArraySet<() => void>()`

- `export const ObserverListeners = new ArraySet<ObservableListener>()`

- `export const MakeObModelSymbol = Symbol('MakeObModelSymbol')`
  - Symbol变量: 

- `export const ObModelSymbol = Symbol('ObModelSymbol')`
  - Symbol变量: 元数据

- `export const ObModelNodeSymbol = Symbol('ObModelNodeSymbol')`
    - Symbol变量: 元数据对于的Node节点

- reaction
  - _boundary
  - _name
  - _memos
  - _effects
  - _reactionsSet
    - set 对象: new ArraySet([reactionsMap])
    - reactionsMap: 

### API

> createObservable = (target: any, key?:PropertyKey, value?: any, shallow?: boolean)
- 判断 value 
  - value 为基础类型时，直接返回 value
  - value 为非基础类型时，从 ProxyRaw 获取元数据

> autorun
- func: reaction
  - reaction._boundary = 0
  - func: cleanRefs()
  - func: tracker
    - releaseBindingReactions: 释放绑定的 Reactions
    - batchStart: BatchCount.value++
    - ReactionStack 存放当前的 reaction
    - 调用 tracker 函数: console.log(obs.aa)
      - obs.aa 触发 Proxy 的 get 操作
        - func: bindTargetKeyWithCurrentReaction
          - DependencyCollected.value = true
            - func: addReactionsMapToReaction
              - 获取 reaction._reactionsSet
              - 绑定 reaction._reactionsSet = new ArraySet([reactionsMap])
            - func: addRawReactionsMap
              - reactionsMap: 建立 key 与 reaction 关系
              - RawReactionsMap: 建立 target  与 reactionsMap 关系
          - 返回 result
      - 执行 tracker 函数
    - ReactionStack 出栈
    - 加锁: _boundary++
    - func: batchEnd
      - BatchCount.value--
      - func: executePendingReactions
      - func: executeBatchEndpoints
    - 解锁: _boundary = 0

### Proxy 的 set 操作
- func: createObservable 
- func: runReactionsFromTargetKey
  - func: batchStart
  - func: runReactions(target, key)
    - func: getReactionsFromTargetKey, 返回 reactions
      - 先从 RawReactionsMap 获取 target 关联的 map
      - 然后从 reactionsMap 获取 key 管理的 reactions
    - 将 reactions 放入 PendingReactions 中
  - func: batchEnd
    - func: tracker
