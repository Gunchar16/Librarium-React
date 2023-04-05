import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './UserContext.js';


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
      <BrowserRouter>
          <Layout />
      </BrowserRouter>
    </UserContextProvider>
    </QueryClientProvider>
  );
}

