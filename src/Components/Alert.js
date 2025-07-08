import Alert from 'react-bootstrap/Alert';

export default function CustomAlert({ alert }) {
  if (!alert?.message) return null;
  return (
    <Alert key={alert.type} variant={alert.type} className="text-center">
      {alert.message}
    </Alert>
  );
}