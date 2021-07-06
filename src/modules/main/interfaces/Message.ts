interface ShortUserData {
  uid: string;
  name: string;
  colorIndex: number;
  avatarSrc?: string;
}

export default interface Message {
  id?: string;
  userData: ShortUserData;
  value: string;
  timestamp: any;
}
