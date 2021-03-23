import React, { FunctionComponent } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import firebaseProvider from '../../../firebase';
import RateLimit from '../interfaces/RateLimit';
import User from '../interfaces/User';

interface RenderRateLimitProviderChildren {
  (data: RateLimit, isLoading: boolean): JSX.Element;
}

interface RateLimitProviderProps {
  user: User;
  renderChildren: RenderRateLimitProviderChildren;
}

const RateLimitProvider: FunctionComponent<RateLimitProviderProps> = ({
  user,
  renderChildren,
}: RateLimitProviderProps) => {
  const rateLimitRef = user
    ? firebaseProvider.firestore.collection('users').doc(user.uid)
    : null;

  const [rateLimitData, isLoading] = useDocumentDataOnce(rateLimitRef);
  return <>{renderChildren(rateLimitData?.rateLimit, isLoading)}</>;
};

export default RateLimitProvider;
