//config
import { RouteProvider } from './config/routeConfig';
// styles
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <RouteProvider />
    </div>
  );
};

export default App;
