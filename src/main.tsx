import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from '~/App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        suspense: true,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>
    </SWRConfig>
  </React.StrictMode>
);
