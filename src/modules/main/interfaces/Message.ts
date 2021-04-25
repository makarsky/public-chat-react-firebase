interface ShortUserData {
  uid: string;
  name: string;
  color: string;
}

export default interface Message {
  id?: string,
  userData: ShortUserData;
  value: string;
  timestamp: any;
}
