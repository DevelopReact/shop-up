// // react
// import { FC, useState } from 'react';
// //lib
// import classNames from 'classnames';
// //assets
// import IconPlus from '@/shared/libs/assets/svg/icon-plus.svg?react';
// import IconMinus from '@/shared/libs/assets/svg/icon-minus.svg?react';
// import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
// // styles
// import styles from './ProductButtonOptions.module.scss';
// import { Button } from '@/shared/ui/Button';

// interface ProductButtonOptionsProps {}

// export const ProductButtonOptions: FC<ProductButtonOptionsProps> = ({}) => {
//   const [activeDecreaseButton, setActiveDecreaseButton] = useState(false);
//   const [activeIncreaseButton, setActiveIncreaseButton] = useState(false);
//   const [count, setCount] = useState(1);
//   const [activeWish, setActiveWish] = useState(false);

//   const onClickDecrease = () => {
//     if (count > 1) {
//       setActiveDecreaseButton(true);
//       setActiveIncreaseButton(false);
//       setCount(count - 1);
//     }
//   };
//   const onClickIncrease = () => {
//     setActiveIncreaseButton(true);
//     setActiveDecreaseButton(false);
//     setCount(count + 1);
//     if (count < 1) {
//       setCount(1);
//     }
//   };

//   return (
//     <div className={styles.ProductButtonOptions}>
//       <div className={styles.wrapperCountButtons}>
//         <button
//           onClick={onClickDecrease}
//           className={classNames(styles.countDecreaseButton, {
//             [styles.active]: activeDecreaseButton
//           })}
//         >
//           <IconMinus />
//         </button>
//         <div className={styles.count}>
//           <p>{count}</p>
//         </div>
//         <button
//           onClick={onClickIncrease}
//           className={classNames(styles.countIncreaseButton, {
//             [styles.active]: activeIncreaseButton
//           })}
//         >
//           <IconPlus />
//         </button>
//       </div>
//       <div className={styles.buyButton}>
//         <Button backgroundColor='accent' type='button'>
//           Buy Now
//         </Button>
//       </div>
//       <button
//         className={classNames(styles.wishButton, {
//           [styles.activeWish]: activeWish
//         })}
//         onClick={() => setActiveWish(!activeWish)}
//       >
//         <WishIcon />
//       </button>
//     </div>
//   );
// };
