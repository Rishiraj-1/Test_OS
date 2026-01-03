import { OSProvider } from './context/OSContext';
import { Desktop } from './components/os/DesktopComponent';
import { Taskbar } from './components/os/Taskbar/Taskbar';

function App() {
  return (
    <OSProvider>
      <Desktop />
      <Taskbar />
    </OSProvider>
  )
}

export default App
