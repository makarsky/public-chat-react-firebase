import React, { FunctionComponent } from 'react';
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  animals,
} from 'unique-names-generator';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import firebaseProvider from '../../../firebase';
import User from '../interfaces/User';
import UserData from '../interfaces/UserData';
import userColors from './userColors';

const getRandomName = () => {
  const config: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    style: 'capital',
  };

  return uniqueNamesGenerator(config);
};

const getUserData = (
  uid: string,
  userDataRaw: firebase.firestore.DocumentData | undefined,
) => {
  return new UserData(
    uid,
    userDataRaw?.name || getRandomName(),
    userDataRaw?.colorIndex ||
      Math.floor(Math.random() * (userColors.length + 1)),
    userDataRaw?.rateLimit,
  );
};

interface RenderUserDataProviderChildren {
  (userData: UserData, isLoading: boolean): JSX.Element;
}

interface UserDataProviderProps {
  user: User;
  renderChildren: RenderUserDataProviderChildren;
}

const UserDataProvider: FunctionComponent<UserDataProviderProps> = ({
  user,
  renderChildren,
}: UserDataProviderProps) => {
  const userDataRef = user
    ? firebaseProvider.firestore.collection('users').doc(user.uid)
    : null;

  const [userDataRaw, isLoading] = useDocumentDataOnce(userDataRef);

  const userData = getUserData(user.uid, userDataRaw);

  return <>{renderChildren(userData, isLoading)}</>;
};

export default UserDataProvider;
