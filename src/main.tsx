import React from 'react'
import ReactDOM from 'react-dom/client'

//Components
import App from './components/App'

//CSS
import "rsuite/dist/rsuite.min.css";
import './assets/index.css'
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

//Dependencies
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { store } from './utils/redux-store.util';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { themes } from './utils/themes';
import ErrorPage from './pages/error/500';

const ErrorFallback = ({ }: FallbackProps) => (<ErrorPage />)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ThemeProvider theme={themes}>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
)
