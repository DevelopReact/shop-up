// react
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
//ui
import { Button } from '@/shared/ui/Button';
//libs
import { getHomeRoute } from '@/shared/libs/constants/routes';
// styles
import styles from './Error.module.scss';

interface ErrorProps {}

export const Error: FC<ErrorProps> = ({}) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`${getHomeRoute()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.Error}>
      <div className={styles.contentError}>
        <div className={styles.roadMap}>
          <p>Home /</p>
          <span> 404 Error</span>
        </div>
        <div className={styles.descriptionError}>
          <h1>404 Not Found</h1>
          <p>Your visited page not found. You may go home page.</p>
        </div>
        <div className={styles.navButton}>
          <Button
            type='button'
            backgroundColor='accent'
            textColor='white'
            height='large'
            onClick={onNavigate}
          >
            Back to home page
          </Button>
        </div>
      </div>
    </div>
  );
};
