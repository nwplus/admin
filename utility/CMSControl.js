import { useState } from 'react';
import { SubscribeToCMSStatus } from './firebase';
import CMSUnderConstructionPage from '../components/CMSUnderConstructionPage';

export default function CMSControl({ children }) {
    const [CMSOff, setCMSOff] = useState(null);
    const [CMSOffDate, setCMSOffDate] = useState();
    useEffect(() => {
        const unsubscribe = SubscribeToCMSStatus(setCMSOff, setCMSOffDate);
        return unsubscribe;
    }, []);

    return CMSOff ? (
        <CMSUnderConstructionPage date={CMSOffDate} />
    ) : (
            <>{children} </>
        );
}
