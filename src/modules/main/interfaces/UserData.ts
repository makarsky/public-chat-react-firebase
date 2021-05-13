import RateLimit from './RateLimit';

export default class UserData {
  uid: string;

  public name: string;

  public colorIndex: number;

  public rateLimit: RateLimit;

  constructor(
    uid: string,
    name: string,
    colorIndex: number,
    rateLimit: RateLimit,
  ) {
    this.uid = uid;
    this.name = name;
    this.colorIndex = colorIndex;
    this.rateLimit = rateLimit;
  }
}
