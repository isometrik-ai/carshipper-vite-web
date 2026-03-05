"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface LoaderProps {
  className?: string;
  signUpLoader?: boolean;
}

const Loader = ({ className = "", signUpLoader = false }: LoaderProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document?.body?.style?.overflow !== "hidden")
        document.body.style.overflow = "hidden"; // Prevent scrolling when loader is visible
      return () => {
        document.body.style.overflow = "auto"; // Restore scrolling when loader unmounts
      };
    }
  }, []);

  if (typeof window === "undefined") return;

  return ReactDOM.createPortal(
    <div className="loader-container flex justify-center items-center">
      <div className={`loader ${className}`}></div>
      <style>
        {`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loader {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top-color: var(--login-cta-bg-primary);
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>,
    document?.body
  );
};

export default Loader;
