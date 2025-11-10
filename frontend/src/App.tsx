import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout.tsx";
import {Dashboard} from "@components/Dashboard.tsx";

function App() {

  return (
      <>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/*<Route path="/settings" element={<Settings />} />*/}
            {/*<Route path="/reports" element={<Reports />} />*/}
          </Routes>
        </Layout>
      </>
  )
}

export default App
