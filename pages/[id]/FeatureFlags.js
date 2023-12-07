import Hiring from '../FeatureFlags/Hiring';
import HackathonFeatureFlags from '../FeatureFlags/HackathonFeatureFlags';
import {
  getHackathonPaths,
  getHackathons,
} from '../../utility/firebase';

export default ({ id, hackathons }) => {
  return id === 'www' ? <Hiring id={id} hackathons={hackathons} /> : <HackathonFeatureFlags id={id} hackathons={hackathons}/>;
}

export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params.id,
    },
  };
};