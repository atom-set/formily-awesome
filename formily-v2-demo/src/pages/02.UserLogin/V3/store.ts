import { observable, action, makeAutoObservable } from "mobx"

type TChannel = 'ad' | 'friend';

class Store {
  public userNameMessage: string = '';
  public phoneNumberMessage: string = '';
  public iDNumberMessage: string = '';
  public passwordMessage: string = '';
  public confirmPasswordMessage: string = '';
  public channel: TChannel = 'ad'

  constructor() {
    makeAutoObservable(this, {
      channel: observable,
      userNameMessage: observable,
      phoneNumberMessage: observable,
      iDNumberMessage: observable,
      passwordMessage: observable,
      confirmPasswordMessage: observable,

      setUserNameMessage: action,
      setPhoneNumberMessage: action,
      setIDNumberMessage: action,
      setPasswordMessage: action,
      setConfirmPasswordMessage: action,
      onChangChannel: action,
    });
  }

  public setUserNameMessage = (message: string) => {
    this.userNameMessage = message;
  }

  public setPhoneNumberMessage = (message: string) => {
    this.phoneNumberMessage = message;
  }

  public setIDNumberMessage = (message: string) => {
    this.iDNumberMessage = message;
  }

  public setPasswordMessage = (message: string) => {
    this.passwordMessage = message;
  }

  public setConfirmPasswordMessage = (message: string) => {
    this.confirmPasswordMessage = message;
  }

  public onChangChannel = (value: TChannel) => {
    this.channel = value;
  }
}


export default Store;
