import { action, makeObservable, observable } from "mobx";
class AppStore {
  constructor() {
    // makeObservable 在mobx6 版本之后 比添加项
    makeObservable(this);
  }
  
  @observable
  count = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  decrement() {
    this.count--;
  }

  @action
  setCount(num:any) {
    this.count = num;
  }

}
export default AppStore;