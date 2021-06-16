interface ShortUserData {
  uid: string;
  name: string;
  colorIndex: number;
}

export default interface Message {
  id?: string;
  userData: ShortUserData;
  value: string;
  timestamp: any;
}
