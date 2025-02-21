import { useUser } from '../contexts/UserContext';
import Chat from '../components/Chat';

const ChatPage = () => {
  const { user } = useUser();

  if (!user) return <div>Please login first</div>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <Chat />
    </div>
  );
};

export default ChatPage;