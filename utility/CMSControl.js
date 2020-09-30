import { useEffect, useState } from 'react';
import { subscribeToCMSStatus } from './firebase';
import CMSUnderConstructionPage from '../components/CMSUnderConstructionPage';
import LoadingPage from '../components/LoadingPage';

export default function CMSControl({ children }) {
  const [CMSOffDate, setCMSOffDate] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToCMSStatus(setCMSOffDate);
    return unsubscribe;
  }, []);

  return CMSOffDate === null ? (
    <LoadingPage />
  ) : CMSOffDate ? (
    <CMSUnderConstructionPage date={CMSOffDate} />
  ) : (
    <>{children} </>
  );
}
