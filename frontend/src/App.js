
import Logo from "./components/Logo";
import ResumeForm from "./components/ResumeForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================
          STATIC HEADER
      ================================= */}

      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">

        <div className="flex h-full items-center px-6">
          <Logo />
        </div>

      </header>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="pt-16">

        <ResumeForm />

      </main>

    </div>
  );
}

export default App;

