// react
import { FC, lazy, Suspense, useEffect, useState } from 'react';
//shared constants
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
// styles
import styles from './CategoryButton.module.scss';

interface CategoryButtonProps {
  title: string;
  icon: string;
}

export const CategoryButton: FC<CategoryButtonProps> = ({ title, icon }) => {
  const [SvgComponent, setSvgComponent] = useState<FC<any> | null>(null);

  useEffect(() => {
    const loadSvgComponent = async () => {
      try {
        const response = await fetch(`${jsonPlaceholderRootURL}${icon}?react`);
        const svgText = await response.text();
        const SvgComponent = lazy(() =>
          Promise.resolve({
            default: () => <div dangerouslySetInnerHTML={{ __html: svgText }} />
          })
        );
        setSvgComponent(() => SvgComponent);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSvgComponent();
  }, [icon]);
  return (
    <div className={styles.CategoryButton}>
      <Suspense fallback={<div>Loading...</div>}>
        {SvgComponent && <SvgComponent />}
      </Suspense>
      <p>{title.replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase())}</p>
    </div>
  );
};
