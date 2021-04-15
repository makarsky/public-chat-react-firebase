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

const getRandomName = () => {
  const config: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    style: 'capital',
  };

  return uniqueNamesGenerator(config);
};

const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#1e88e5',
  '#009688',
  '#43a047',
  '#f57c00',
  '#ff5722',
];

const getUserData = (
  uid: string,
  userDataRaw: firebase.firestore.DocumentData | undefined,
) => {
  return new UserData(
    uid,
    userDataRaw?.name || getRandomName(),
    userDataRaw?.color ||
      colors[Math.floor(Math.random() * (colors.length + 1))],
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
