// react
import { FC } from 'react';
// ui
import { PostItem } from '../PostItem/PostItem';
// api
import { useGetPostsQuery } from '../../api/postAPI';
// styles
import styles from './PostItemList.module.scss';

interface PostItemListProps {}

export const PostItemList: FC<PostItemListProps> = ({}) => {
  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <div className={styles.PostItemList}>
      {data?.map(({ body, id, title, userId }) => {
        return (
          <PostItem
            body={body}
            id={id}
            userId={userId}
            title={title}
            key={id}
          />
        );
      })}
    </div>
  );
};
