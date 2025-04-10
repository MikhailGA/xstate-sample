import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FetchMachineContext } from './machine.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FetchMachineContext.Provider>
      <App />
    </FetchMachineContext.Provider>
  </StrictMode>,
)
