import { Navigate, useParams } from 'react-router-dom';

const YearRedirect = () => {
  const { year } = useParams<{ year: string }>();
  return <Navigate to={`/celebration/${year}`} replace />;
};

export default YearRedirect;
