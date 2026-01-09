import Alert from 'react-bootstrap/Alert';

type Props = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  message: string;
};

export default function ExtraAlert({ variant = 'info', message }: Props) {
  return <Alert variant={variant}>{message}</Alert>;
}