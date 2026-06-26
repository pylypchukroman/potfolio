import { InitialLoadGate } from "@/components/InitialLoadGate";
import { PortfolioPage } from "@/components/PortfolioPage";

export default function Home() {
  return (
    <InitialLoadGate>
      <PortfolioPage />
    </InitialLoadGate>
  );
}
