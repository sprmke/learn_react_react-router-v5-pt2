import { useParams, Route } from 'react-router-dom';

const QuoteDetail = () => {
  const params = useParams();

  return (
    <div>
      <h1>Quote Detail Page</h1>
      <p>{params.quoteId}</p>
    </div>
  );
};

export default QuoteDetail;
