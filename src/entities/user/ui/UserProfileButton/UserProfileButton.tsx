// react
import { FC, useState } from 'react';
// ui
import { IconButton } from '@/shared/ui/IconButton';
import { UserDropDown } from '../UserDropDown';
//assets
import UserIcon from '@/shared/libs/assets/svg/userLink.svg?react';

interface UserProfileButtonProps {}

export const UserProfileButton: FC<UserProfileButtonProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onIconButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton
        onClick={onIconButtonClick}
        backgroundColor='accent'
        children={<UserIcon />}
      />
      <UserDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
