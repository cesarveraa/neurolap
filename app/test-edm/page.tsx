import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EdmWizard } from "@/components/test/edm-wizard";
export default function TestEDMPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <EdmWizard />
      </main>
      <Footer />
    </div>
  );
}
