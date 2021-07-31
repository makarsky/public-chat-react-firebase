// Set timeout as you want. Don't forget to add rate limiting rules to firestore from README.md
const timeoutInSeconds = 0;

export const isCoolDownActive = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return lastAccessDate > allowedDate;
};

export const getCoolDownSeconds = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return Math.ceil((lastAccessDate.getTime() - allowedDate.getTime()) / 1000);
};
