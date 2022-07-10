import { Wrapper } from './Notification.styled';

const Notification = ({ eventColor = 'black', children }) => {
  return <Wrapper eventColor={eventColor}>{children}</Wrapper>;
};

export default Notification;
