import { formatDate } from '../utility/firebase';

export default function CMSUnderConstructionPage({ date }) {
  return (
    <div>
      The CMS is under maintainance.
      <br />
      It will be back up at {formatDate(date.seconds)}
      <br />
      Please come back later.
    </div>
  );
}
