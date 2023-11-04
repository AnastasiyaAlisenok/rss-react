import React, { useContext, useEffect, useState } from 'react';
import {
  LoaderFunction,
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './DetailBlock.scss';
import { ContentContext } from '../../hoc/ContentProvider';
import { getDetailInfo } from '../../api/apiRequests';
import { ProductType } from '../../types/types';
import Loader from '../Loader/Loader';

type ParamsType = {
  id: number;
};

/* export const detailLoader = async ({request, params}) => {
  console.log({request, params})
  const data = await getDetailInfo(params.id);
  return data;
}; */

const DetailBlock = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { page, id } = useParams();
  const { product, setNewProduct } = useContext(ContentContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDetailInfo(Number(id), Number(page)).then((obj) => {
      setNewProduct(obj);
      setLoading(false);
    });
  }, [id, page]);
  return (
    <div className="detail">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="detail-block">
            <button
              type="button"
              className="detail-block__close-btn"
              onClick={(): void => navigate(-1)}
            >
              Close
            </button>
            <img
              className="detail-block__img"
              src={product?.images[0]}
              alt="item-img"
            />
            <div className="detail-block__content">
              <h2 className="detail-block__title">{product?.title}</h2>
              <p className="detail-block__price">Price: {product?.price}$</p>
              <p className="detail-block__rating">Rating: {product?.rating}</p>
              <p className="detail-block__brand">Brand: {product?.brand}</p>
              <p className="detail-block__text">{product?.description}</p>
            </div>
          </div>
          <button
            className="detail__overley"
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
