import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type Props = {
  title?: string;
  message: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  dismissible?: boolean;
};

export default function ErrorAlert({
  title = 'Error',
  message,
  variant = 'danger',
  dismissible = true,
}: Props) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible={dismissible}>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}