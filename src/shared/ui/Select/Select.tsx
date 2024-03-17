// react
import { FC, FormEvent, useState } from 'react';
//libs
import SelectIcon from '@/shared/libs/assets/svg/SelectIcon.svg?react';
// styles
import styles from './Select.module.scss';

const arrLanguage = [
  { language: 'Ukraine', id: '1' },
  { language: 'France', id: '2' },
  { language: 'Germany', id: '3' },
  { language: 'Spain', id: '4' }
];
interface SelectProps {}

export const Select: FC<SelectProps> = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const showDropdownHandler = () => setShowDropdown(!showDropdown);

  const optionJSX = arrLanguage?.map((lang) => {
    const onToggleLang = (e: FormEvent<HTMLElement>) => {
      const input = e.target as HTMLElement;
      setCurrentLang(input.innerText);
      setShowDropdown(!showDropdown);
    };
    return (
      <li key={lang.id} onClick={onToggleLang}>
        {lang.language}
      </li>
    );
  });

  return (
    <div className={styles.wrapperSelect}>
      <div className={styles.Select} onClick={showDropdownHandler}>
        {currentLang}
        <SelectIcon />
      </div>
      {showDropdown && <ul>{optionJSX}</ul>}
    </div>
  );
};
