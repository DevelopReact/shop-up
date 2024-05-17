// react
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
//api
import { useGetProductIdMutation } from '../../api/productAPI';
//types
import { IProductIdResponse } from './../../model/types/productTypes';
//ui
import { ProductButtonOptions } from '../ProductButtonOptions';
import { LikeStarsCount } from '../LikeStarsCount';
import { ProductSizeOptions } from '../ProductSizeOptions';
import { ProductColorOptions } from '../ProductColorOptions';
import { RelatedItem } from '../RelatedItem';
//constants
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
//assets
import IconDelivery from '@/shared/libs/assets/svg/icon-delivery.svg?react';
import IconReturns from '@/shared/libs/assets/svg/Icon-return.svg?react';
// styles
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {}

export const ProductDetails: FC<ProductDetailsProps> = ({}) => {
  const { productId } = useParams();

  const [product, setProduct] = useState<IProductIdResponse>();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const [getProductId] = useGetProductIdMutation();
  //getting product data by id
  useEffect(() => {
    if (productId) {
      getProductId(+productId)
        .unwrap()
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }
  }, [productId, getProductId]);
  //handle change product data options
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  //calculation price count with discount
  const priceWithDiscount = Math.round(
    product! &&
      product.data.attributes.price -
        (product.data.attributes.price *
          product.data.attributes.discountPercent) /
          100
  );

  return (
    <div className={styles.ProductDetails}>
      <div className={styles.headerContact}>
        <div className={styles.roadMap}>
          <p>
            Account&nbsp;/&nbsp;{product?.data.attributes.category}&nbsp;/&nbsp;
          </p>
          <span>{product?.data.attributes.title}</span>
        </div>
      </div>
      <div className={styles.mainProductDetails}>
        <div className={styles.productPictures}>
          <div className={styles.minorPictures}>
            {product?.data.attributes.pictures.data?.map((data) => {
              return (
                <div className={styles.picture} key={data.id}>
                  <img
                    src={`${jsonPlaceholderRootURL}${data.attributes.url}`}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.mainPicture}>
            <img
              src={`${jsonPlaceholderRootURL}${product?.data.attributes.mainPicture.data.attributes.url}`}
              alt={product?.data.attributes.title}
            />
          </div>
        </div>
        <div className={styles.productOptions}>
          <div className={styles.productData}>
            <div className={styles.productTitle}>
              <h1>{product?.data.attributes.title}</h1>
            </div>
            <div className={styles.productLikes}>
              <LikeStarsCount />
              <span>(150 Reviews)</span>
              <span>&nbsp;|&nbsp;</span>
              <p>In Stock</p>
            </div>
            <div className={styles.productPrice}>
              <h2>${priceWithDiscount.toFixed(2)}</h2>
            </div>
            <div className={styles.productDescription}>
              <p>{product?.data.attributes.description}</p>
            </div>
          </div>
          <div className={styles.productVarietyChoice}>
            <div className={styles.productColors}>
              {product?.data.attributes.colors ? <p>Colors:</p> : null}
              {product?.data.attributes.colors?.map((color: string) => {
                return (
                  <ProductColorOptions
                    buttonBackground={color}
                    color={color}
                    key={color}
                    onSelectColor={handleColorChange}
                    selectColor={selectedColor}
                  />
                );
              })}
            </div>
            <div className={styles.productSizes}>
              {product?.data.attributes.sizes ? <p>Size:&nbsp;</p> : null}
              {product?.data.attributes.sizes?.map((size: string) => {
                return (
                  <ProductSizeOptions
                    key={size}
                    size={size}
                    selectedSize={selectedSize}
                    onSelectSize={handleSizeChange}
                  />
                );
              })}
            </div>
            <div className={styles.wrapperChoiceButtons}>
              <ProductButtonOptions />
            </div>
          </div>
          <div className={styles.delivery}>
            <div className={styles.freeDelivery}>
              <IconDelivery />
              <div className={styles.titleDelivery}>
                <p>Free Delivery</p>
                <span>Enter your postal code for Delivery Availability</span>
              </div>
            </div>
            <div className={styles.returnDelivery}>
              <IconReturns />
              <div className={styles.titleDelivery}>
                <p>Return Delivery</p>
                <span>Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedItem />
    </div>
  );
};
