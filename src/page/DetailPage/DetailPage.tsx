import DetailBlock from '../../components/DetailBlock/DetailBlock';
import ItemsList from '../../components/ItemsList/ItemsList';

const DetailPage = (): JSX.Element => {
  return (
    <div className="page">
      <ItemsList />
      <DetailBlock />
    </div>
  );
};

export default DetailPage;
