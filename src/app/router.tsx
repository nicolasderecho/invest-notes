import { Route, Routes } from "react-router";
import { AppShell } from "./AppShell";
import HomePage from "@/pages/HomePage";
import IbkrHomePage from "@/pages/ibkr/IbkrHomePage";
import CspxPage from "@/pages/ibkr/CspxPage";
import BuyCspxPage from "@/pages/ibkr/BuyCspxPage";
import PortfolioPage from "@/pages/ibkr/PortfolioPage";
import AlternativesPage from "@/pages/ibkr/AlternativesPage";
import TaxReportingPage from "@/pages/ibkr/TaxReportingPage";
import LocalHomePage from "@/pages/local/LocalHomePage";
import CedearsPage from "@/pages/local/CedearsPage";
import FciPage from "@/pages/local/FciPage";
import CaucionesPage from "@/pages/local/CaucionesPage";
import GlossaryPage from "@/pages/GlossaryPage";
import NotFoundPage from "@/pages/NotFoundPage";
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="ibkr">
          <Route index element={<IbkrHomePage />} />
          <Route path="cspx" element={<CspxPage />} />
          <Route path="buy-cspx" element={<BuyCspxPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="alternatives" element={<AlternativesPage />} />
          <Route path="1042-s" element={<TaxReportingPage />} />
        </Route>
        <Route path="local">
          <Route index element={<LocalHomePage />} />
          <Route path="cedears" element={<CedearsPage />} />
          <Route path="fci" element={<FciPage />} />
          <Route path="cauciones" element={<CaucionesPage />} />
        </Route>
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
