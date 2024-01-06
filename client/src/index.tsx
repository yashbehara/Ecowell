import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Main from "./Main";
import ErrorHandler from "components/ErrorHandler";
import { CLIENT_ID } from "constants/constants";

import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

//added error handler
type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorHandler />;
    }
    return this.props.children;
  }
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        {/* O auth wrapper */}
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <BrowserRouter>
            {/* For internationalization */}
            <I18nextProvider i18n={i18n.i18n}>
              <Main />
            </I18nextProvider>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

//added network 1st based service worker
registerServiceWorker();
