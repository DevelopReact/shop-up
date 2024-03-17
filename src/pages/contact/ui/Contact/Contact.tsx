// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
//lib
import { yupResolver } from '@hookform/resolvers/yup';
//libs
import IconPhone from '@/shared/libs/assets/svg/icons-phone.svg?react';
import IconMail from '@/shared/libs/assets/svg/icons-mail.svg?react';
//libs
import { contactValidationSchema } from '../../libs/validationSchema/contactValidationSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './Contact.module.scss';

interface ContactProps {}

export const Contact: FC<ContactProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(contactValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });

  return (
    <div className={styles.Contact}>
      <div className={styles.headerContact}>
        <div className={styles.roadMap}>
          <p>Home&nbsp;/&nbsp;</p>
          <span>Contact</span>
        </div>
      </div>
      <div className={styles.mainContact}>
        <div className={styles.shopContact}>
          <div className={styles.cardContact}>
            <div className={styles.headerCardContact}>
              <IconPhone />
              <span>Call To Us</span>
            </div>
            <div className={styles.mainCardContact}>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>
          <div className={styles.cardContact}>
            <div className={styles.headerCardContact}>
              <IconMail />
              <span>Write To US</span>
            </div>
            <div className={styles.mainCardContact}>
              <p>
                Fill out our form and we will contact <br /> you within 24
                hours.
              </p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <div className={styles.userContact}>
          <form className={styles.formUserContact} onSubmit={onSubmit}>
            <div className={styles.inputsUserContact}>
              <div className={styles.inputWrapper}>
                <Input
                  type='text'
                  placeholder='Your Name *'
                  backgroundColor='grey'
                  register={register('name')}
                  error={formState.errors.name}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  type='email'
                  placeholder='Your Email *'
                  backgroundColor='grey'
                  error={formState.errors.email}
                  register={register('email')}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  type='tel'
                  placeholder='Your Phone *'
                  backgroundColor='grey'
                  error={formState.errors.phone}
                  register={register('phone')}
                />
              </div>
            </div>
            <div className={styles.textareaUserContact}>
              <Textarea
                placeholder='Your Message'
                backgroundColor='grey'
                error={formState.errors.message}
                register={register('message')}
              />
            </div>
            <div className={styles.sendFormButton}>
              <div>
                <Button
                  type='submit'
                  backgroundColor='accent'
                  textColor='white'
                  disabled={!formState.isValid}
                >
                  Send Massage
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
