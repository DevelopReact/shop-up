// react
import { FC } from 'react';
// types
import { IPost } from '../../model/types/post';
// styles
import styles from './PostItem.module.scss';

interface PostItemProps extends IPost {}

export const PostItem: FC<PostItemProps> = ({ body, id, title, userId }) => {
  return (
    <div className={styles.PostItem}>
      <div>{id}</div>
      <div>{title}</div>
    </div>
  );
};
