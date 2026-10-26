const Notification = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  );
};

export default Notification;