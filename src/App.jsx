import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/index";
import LineasPage from "./pages/lineas";
import ProyectosPage from "./pages/proyectos.index";
import ProyectoDetalle from "./pages/proyectos.$proyectoId";
import InvestigadoresPage from "./pages/investigadores";
import PresupuestoPage from "./pages/presupuesto";
import PublicacionesPage from "./pages/publicaciones";
import TransferenciasPage from "./pages/transferencias";
import ConveniosPage from "./pages/convenios";
import ReportesPage from "./pages/reportes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lineas" element={<LineasPage />} />
        <Route path="/proyectos" element={<ProyectosPage />} />
        <Route path="/proyectos/:proyectoId" element={<ProyectoDetalle />} />
        <Route path="/investigadores" element={<InvestigadoresPage />} />
        <Route path="/presupuesto" element={<PresupuestoPage />} />
        <Route path="/publicaciones" element={<PublicacionesPage />} />
        <Route path="/transferencias" element={<TransferenciasPage />} />
        <Route path="/convenios" element={<ConveniosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
