import { useEffect, useState } from 'react';
import { SubscribeToCMSStatus } from './firebase';
import CMSUnderConstructionPage from '../components/CMSUnderConstructionPage';
import LoadingPage from '../components/LoadingPage';

export default function CMSControl({ children }) {
  const [CMSOff, setCMSOff] = useState(null);
  const [CMSOffDate, setCMSOffDate] = useState();
  useEffect(() => {
    const unsubscribe = SubscribeToCMSStatus(setCMSOff, setCMSOffDate);
    return unsubscribe;
  }, []);

  return CMSOff === null ? (
    <LoadingPage />
  ) : CMSOff ? (
    <CMSUnderConstructionPage date={CMSOffDate} />
  ) : (
    <>{children} </>
  );
}
