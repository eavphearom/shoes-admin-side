
import { useCallback, useEffect, useRef, useState } from "react";
import Loading from "../components/ui/Loading";
import apiClient from "../services/apiClient";

const MIN_LOADING_TIME = 1000;

export function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const activeRequests = useRef(0);
  const startedAt = useRef(0);
  const timer = useRef(null);

  const showLoading = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!startedAt.current) {
      startedAt.current = Date.now();
    }

    activeRequests.current += 1;
    setVisible(true);
  }, []);

  const hideLoading = useCallback(() => {
    activeRequests.current = Math.max(
      0,
      activeRequests.current - 1
    );

    if (activeRequests.current > 0) return;

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(
      0,
      MIN_LOADING_TIME - elapsed
    );

    timer.current = setTimeout(() => {
      if (activeRequests.current === 0) {
        setVisible(false);
        startedAt.current = 0;
      }

      timer.current = null;
    }, remaining);
  }, []);

  useEffect(() => {
    const requestId = apiClient.interceptors.request.use(
      (config) => {
        if (!config.skipGlobalLoading) {
          config._globalLoadingStarted = true;
          showLoading();
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const finishLoading = (config) => {
      if (config?._globalLoadingStarted) {
        config._globalLoadingStarted = false;
        hideLoading();
      }
    };

    const responseId = apiClient.interceptors.response.use(
      (response) => {
        finishLoading(response.config);
        return response;
      },
      (error) => {
        finishLoading(error.config);
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestId);
      apiClient.interceptors.response.eject(responseId);

      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [showLoading, hideLoading]);

  return (
    <>
      {children}
      {visible && <Loading overlay />}
    </>
  );
}
