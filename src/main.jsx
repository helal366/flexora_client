import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './api/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'
import router from './routes/Routers';
import { ToastContainer } from 'react-toastify'
import AuthProvider from './auths/AuthProvider.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='max-w-[2520px]'>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>
  </StrictMode>,
)
