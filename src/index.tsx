import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import ApiCredentialsProvider from "./Context/ApiCredentialsProvider";
import * as Sentry from "@sentry/react";

import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://0bc9a2e54f3c4443bd1a88fbe540ffa0@o434225.ingest.sentry.io/5439060",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ApiCredentialsProvider>
        <App />
      </ApiCredentialsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
