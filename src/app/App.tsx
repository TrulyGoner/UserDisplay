import { StoreProvider } from './providers/StoreProvider';
import { UsersPage } from '../pages/users';

function App() {
  return (
    <StoreProvider>
      <UsersPage />
    </StoreProvider>
  );
}

export default App;
