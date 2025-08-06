import { Toaster } from 'react-hot-toast';

export const AppToaster = () => (
  <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
        },
      }}
    />

    <style>{`
      :root {
        --toast-bg: #ffffff;
        --toast-color: #1f2937;
      }
      .dark {
        --toast-bg: #374151;
        --toast-color: #f9fafb;
      }
    `}</style>
  </>
); 