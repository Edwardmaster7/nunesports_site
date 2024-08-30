const Main = ({ className, children }) => {
    return (
      <main
        className={`min-h-screen bg-gradient-to-br from-indigo-100 from-15% via-purple-300 via-50% to-indigo-400 bg-blend-saturation dark:from-indigo-600 dark:via-purple-700 dark:to-indigo-900 ${className}`}
      >
        {children}
      </main>
    );
  };
  
  export default Main;
  