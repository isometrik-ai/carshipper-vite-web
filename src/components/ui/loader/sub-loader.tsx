"use client";
interface subLoaderProps {
    className?: string;
    borderColor?:string;
    loaderWidth?:string;
    loaderHeight?:string;
  }
  
  const SubLoader = (props: subLoaderProps) => {
    const { className = '', borderColor = 'var(--login-cta-bg-primary)',
        loaderWidth="20px", loaderHeight="20px"
     } = props;
    return (
      <><div className="subLoaderContainer">
        <div className={`subLoader ${className}`}></div>
      </div><style>
          {`
        .subLoader{
          height: ${loaderWidth};
          width: ${loaderHeight};
          border-radius: 9999px;
          border-top-width: 5px;
          border-color: var(--login-cta-bg-primary);
          animation: spin 1s linear infinite;
          z-index: 10000;
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
      </>
    );
    
  };
  
  export default SubLoader;