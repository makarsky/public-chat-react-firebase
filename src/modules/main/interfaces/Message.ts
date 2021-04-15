interface ShortUserData {
  uid: string;
  name: string;
  color: string;
}

export default interface Message {
  userData: ShortUserData;
  value: string;
  timestamp: any;
}
