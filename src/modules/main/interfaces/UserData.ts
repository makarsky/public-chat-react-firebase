import RateLimit from './RateLimit';

export default class UserData {
  uid: string;

  public name: string;

  public color: string;

  public rateLimit: RateLimit;

  constructor(uid: string, name: string, color: string, rateLimit: RateLimit) {
    this.uid = uid;
    this.name = name;
    this.color = color;
    this.rateLimit = rateLimit;
  }
}
