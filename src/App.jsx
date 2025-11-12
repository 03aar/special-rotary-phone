import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Launch from './screens/Launch'
import Awakening from './screens/Awakening'
import IdentitySelection from './screens/IdentitySelection'
import AccountSetup from './screens/AccountSetup'
import BaselineChallenge from './screens/BaselineChallenge'
import BaselineAnalysis from './screens/BaselineAnalysis'
import Dashboard from './screens/Dashboard'
import MissionActive from './screens/MissionActive'
import MissionResults from './screens/MissionResults'
import ProgressMap from './screens/ProgressMap'
import Analytics from './screens/Analytics'
import Settings from './screens/Settings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Entry Flow */}
        <Route path="/" element={<Launch />} />
        <Route path="/awakening" element={<Awakening />} />

        {/* Onboarding */}
        <Route path="/identity" element={<IdentitySelection />} />
        <Route path="/signup" element={<AccountSetup />} />
        <Route path="/baseline" element={<BaselineChallenge />} />
        <Route path="/baseline-analysis" element={<BaselineAnalysis />} />

        {/* Main Application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mission" element={<MissionActive />} />
        <Route path="/mission-results" element={<MissionResults />} />

        {/* Supporting Pages */}
        <Route path="/progress" element={<ProgressMap />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
