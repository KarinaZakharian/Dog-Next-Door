import './Main.scss';

function Main({ children }) {
  return (
    <main className="general-main">
      <div className="general-main-background"></div>
      {children}
    </main>
  );
}

export default Main;
