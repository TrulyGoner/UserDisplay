import { UsersPage } from '../pages/users';
import { Toast, ApiStatus } from '../shared/ui';
import './styles/index.css';

function App() {
  return (
    <>
      <ApiStatus />
      <UsersPage />
      <Toast />
    </>
  );
}

export default App;
