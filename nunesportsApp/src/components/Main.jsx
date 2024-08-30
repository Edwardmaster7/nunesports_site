const Main = ({ className, children }) => {
    return (
      <main
        className={`min-h-screen bg-gradient-to-br from-slate-100 from-15% via-slate-300 via-50% to-slate-400 bg-blend-saturation dark:from-indigo-600 dark:via-purple-700 dark:to-indigo-900 ${className}`}
      >
        {children}
      </main>
    );
  };
  
  export default Main;
  