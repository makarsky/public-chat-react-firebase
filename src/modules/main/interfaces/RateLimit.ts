export default interface RateLimit {
  lastMessage: {
    toDate: () => Date;
  };
}
