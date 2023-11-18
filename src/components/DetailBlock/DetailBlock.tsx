import { useNavigate, useParams } from 'react-router-dom';
import './DetailBlock.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useGetProductQuery } from '../../api/api';
import useActions from '../../redux/hooks/useActions';
import { RootState } from '../../redux/store';

const DetailBlock = (): JSX.Element => {
  const { page, id } = useParams();
  const { setLoadingDeatil } = useActions();
  const isLoading = useSelector((state: RootState) => state.isLoadingDetail);
  const navigate = useNavigate();
  const { data, isFetching } = useGetProductQuery({
    id: Number(id),
    page: Number(page),
  });

  useEffect(() => {
    setLoadingDeatil(isFetching);
  }, [isFetching]);

  return (
    <div className="detail">
      {isLoading && !data ? (
        <Loader />
      ) : (
        <>
          <div className="detail-block" data-testid="detail">
            <button
              data-testid="btn-close"
              type="button"
              className="detail-block__close-btn"
              onClick={(): void => navigate(-1)}
            >
              Close
            </button>
            <img
              className="detail-block__img"
              src={data?.images[0]}
              alt="item-img"
            />
            <div className="detail-block__content">
              <h2 className="detail-block__title">{data?.title}</h2>
              <p className="detail-block__price">Price: {data?.price}$</p>
              <p className="detail-block__rating">Rating: {data?.rating}</p>
              <p className="detail-block__brand">Brand: {data?.brand}</p>
              <p className="detail-block__text">{data?.description}</p>
            </div>
          </div>
          <button
            className="detail__overlay"
            type="button"
            aria-label=" "
            onClick={(): void => navigate(-1)}
          />
        </>
      )}
    </div>
  );
};

export default DetailBlock;
