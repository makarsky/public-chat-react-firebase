import React from 'react';
import RateLimit from './RateLimit';

export default interface MessageFormProps {
  userUid: string;
  isLoading: boolean;
  rateLimit: RateLimit;
}
