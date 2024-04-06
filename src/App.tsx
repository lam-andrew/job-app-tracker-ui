import './App.css';
import JobForm from './components/JobForm';
import TestDatabaseConnection from './components/TestDatabaseConnection';

function App() {
  return (
    <div className="App h-screen bg-slate-100">
      <TestDatabaseConnection />
      <JobForm />
    </div>
  );
}

export default App;
