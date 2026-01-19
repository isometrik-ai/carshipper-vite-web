/**
 * Loading state component for the landing page
 */
export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading page content">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
