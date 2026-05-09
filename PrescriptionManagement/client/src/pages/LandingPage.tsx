import { Link } from "wouter";
import medicalSymbol from "../../medical-symbol.png";

export default function LandingPage() {
  return (
    <div
      className="landing-font bg-[#f8f9ff] text-[#0b1c30] overflow-x-hidden min-h-screen"
    >
      {/* Top Navigation Bar */}
      <nav className="bg-[rgba(248,249,255,0.9)] backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-[32px] flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img
              alt="MedScan Logo"
              className="h-9 w-9 object-contain"
              src={medicalSymbol}
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-[#004ac6] font-bold border-b-2 border-[#004ac6] pb-1 text-[13px] leading-[1] tracking-[0.05em]"
              href="#"
            >
              Features
            </a>
            <a
              className="text-[#434655] font-medium hover:text-[#004ac6] transition-colors duration-200 text-[13px] leading-[1] tracking-[0.05em]"
              href="#"
            >
              How it Works
            </a>
            <a
              className="text-[#434655] font-medium hover:text-[#004ac6] transition-colors duration-200 text-[13px] leading-[1] tracking-[0.05em]"
              href="#"
            >
              Safety
            </a>
            <a
              className="text-[#434655] font-medium hover:text-[#004ac6] transition-colors duration-200 text-[13px] leading-[1] tracking-[0.05em]"
              href="#"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <span className="text-[#434655] font-medium hover:text-[#004ac6] transition-colors duration-200 text-[13px] leading-[1] tracking-[0.05em] cursor-pointer">
                Sign in
              </span>
            </Link>
            <Link href="/signup">
              <span className="bg-[#2563eb] text-[#eeefff] px-6 py-2.5 rounded-lg font-bold hover:scale-95 transition-transform duration-150 text-[13px] leading-[1] tracking-[0.05em] cursor-pointer inline-block">
                Get started
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-visible bg-white bg-[radial-gradient(rgb(203,213,225)_1.2px,transparent_1.2px)] [background-size:32px_32px]">
          <div className="max-w-[1280px] mx-auto px-[32px] relative">
            {/* Hero Content */}
            <div className="text-center max-w-3xl mx-auto relative z-10">
              <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-[#0b1c30] mb-6">
                Scan prescriptions.
                <br />
                <span className="text-[#004ac6]">Order medicines.</span>
                <br />
                All in one place.
              </h1>

              <p className="text-[18px] leading-[1.6] font-normal text-[#434655] mb-10 px-4">
                Upload a prescription, extract medicine names, add items to cart if available, and
                complete checkout with pharmacist approval for Rx medicines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/scan-prescription">
                  <span className="bg-[#2563eb] text-[#eeefff] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 ambient-shadow hover:scale-95 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined">camera</span>
                    Scan Prescription
                  </span>
                </Link>

                <Link href="/store">
                  <span className="bg-[#eff4ff] text-[#004ac6] px-8 py-4 rounded-xl font-bold border border-[rgba(0,74,198,0.1)] flex items-center justify-center gap-2 hover:bg-[#dce9ff] transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">medication</span>
                    Browse Medicines
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#434655] text-[13px] leading-[1] tracking-[0.05em] font-semibold opacity-70">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span> Secure uploads
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span> Rx
                  compliance
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span> Order
                  tracking
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  Reminders
                </span>
              </div>
            </div>

            {/* Floating Corner Cards */}
            {/* Card A: top-left */}
            <div className="hidden lg:block absolute top-0 -left-8 w-64 glass-card p-5 rounded-2xl ambient-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#0b1c30]">
                  AI Prescription Scan
                </span>
                <span className="material-symbols-outlined text-[#004ac6]">psychology</span>
              </div>

              <div className="aspect-square bg-[#eff4ff] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-[#004ac6] to-[#006c49]"></div>
                <span className="material-symbols-outlined text-4xl text-[#c3c6d7]">photo_camera</span>
                <div className="absolute top-2 right-2 bg-[rgba(0,108,73,0.1)] text-[#006c49] px-2 py-1 rounded text-[10px] font-bold">
                  Matched: 2/3
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-[rgba(0,108,73,0.1)] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#006c49] text-sm">check_circle</span>
                  <span className="text-xs font-medium">Amoxicillin</span>
                </div>
                <div className="flex items-center gap-2 bg-[rgba(0,108,73,0.1)] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#006c49] text-sm">check_circle</span>
                  <span className="text-xs font-medium">Paracetamol</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e5eeff] p-2 rounded-lg opacity-60">
                  <span className="material-symbols-outlined text-[#c3c6d7] text-sm">help_outline</span>
                  <span className="text-xs font-medium">Cetirizine</span>
                </div>
              </div>
            </div>

            {/* Card B: top-right */}
            <div className="hidden lg:block absolute top-12 -right-8 w-64 glass-card p-5 rounded-2xl ambient-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#0b1c30]">
                  Pharmacist Approval
                </span>
                <span className="material-symbols-outlined text-[#006c49]">health_and_safety</span>
              </div>

              <div className="flex flex-col items-center py-4">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[rgba(0,108,73,0.2)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006c49] text-3xl">shield</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#006c49] text-white rounded-full p-1 border-2 border-white">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>
                <div className="bg-[#006c49] text-white px-4 py-1.5 rounded-full text-xs font-bold mb-2">
                  Approved
                </div>
                <p className="text-[11px] text-[#434655] text-center">
                  Reviewed by licensed pharmacist ID: #MS-9822
                </p>
              </div>
            </div>

            {/* Card C: bottom-left */}
            <div className="hidden lg:block absolute -bottom-16 -left-4 w-72 glass-card p-5 rounded-2xl ambient-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#0b1c30]">
                  Order Tracking
                </span>
                <span className="material-symbols-outlined text-[#004ac6]">map</span>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#e5eeff]"></div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#006c49] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">Confirmed</p>
                    <p className="text-[10px] text-[#434655]">10:30 AM</p>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#006c49] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">Shipped</p>
                    <p className="text-[10px] text-[#434655]">02:15 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center text-white ring-4 ring-[rgba(37,99,235,0.2)]">
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#004ac6]">Out for delivery</p>
                    <p className="text-[10px] text-[#434655]">Today, Est. 5:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#c3c6d7]">
                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#c3c6d7]">Delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card D: bottom-right */}
            <div className="hidden lg:block absolute -bottom-12 -right-4 w-64 glass-card p-5 rounded-2xl ambient-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#0b1c30]">
                  Medicine Reminders
                </span>
                <span className="material-symbols-outlined text-[#3e3fcc]">alarm</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#004ac6] rounded-full"></div>
                    <div>
                      <p className="text-xs font-bold">Morning Meds</p>
                      <p className="text-[10px] text-[#434655]">08:00 AM</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#006c49]">check_box</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#3e3fcc] rounded-full"></div>
                    <div>
                      <p className="text-xs font-bold">Lunch Dose</p>
                      <p className="text-[10px] text-[#434655]">01:00 PM</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#c3c6d7]">check_box_outline_blank</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e5eeff]">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span>Daily Progress</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-[#e5eeff] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#004ac6] to-[#3e3fcc] h-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-[32px]">
            <div className="text-center mb-16">
              <h2 className="text-[30px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#0b1c30] mb-4">
                A complete medical ecosystem
              </h2>
              <p className="text-[#434655] max-w-2xl mx-auto">
                From scanning to delivery, we&apos;ve digitized the pharmacy experience with safety as our
                core priority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(0,74,198,0.1)] rounded-xl flex items-center justify-center text-[#004ac6] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">document_scanner</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Prescription scanning</h3>
                <p className="text-[#434655]">
                  Advanced AI vision technology extracts medicine names and dosages from handwritten or
                  printed prescriptions with high accuracy.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(0,108,73,0.1)] rounded-xl flex items-center justify-center text-[#006c49] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Smart matching</h3>
                <p className="text-[#434655]">
                  Instantly matches scanned items against our massive catalog of available medicines,
                  suggest alternatives if out of stock.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(62,63,204,0.1)] rounded-xl flex items-center justify-center text-[#3e3fcc] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">shopping_cart_checkout</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">One-tap automation</h3>
                <p className="text-[#434655]">
                  Add all found medicines to your cart with a single tap, saving you the hassle of
                  manual searching and selection.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(0,108,73,0.1)] rounded-xl flex items-center justify-center text-[#006c49] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Rx compliance queue</h3>
                <p className="text-[#434655]">
                  Every prescription medicine is verified by a human pharmacist before fulfillment,
                  ensuring 100% legal compliance.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(0,74,198,0.1)] rounded-xl flex items-center justify-center text-[#004ac6] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">stroke_full</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Real-time tracking</h3>
                <p className="text-[#434655]">
                  Track your medicine package from the moment it leaves the warehouse until it reaches
                  your doorstep.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8f9ff] border border-[rgba(195,198,215,0.2)] hover:border-[rgba(0,74,198,0.3)] transition-all group">
                <div className="w-12 h-12 bg-[rgba(62,63,204,0.1)] rounded-xl flex items-center justify-center text-[#3e3fcc] mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Smart reminders</h3>
                <p className="text-[#434655]">
                  Automated medication schedule based on your prescription, helping you stay
                  consistent with your treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-[32px]">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-[30px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#0b1c30] mb-8">
                  From paper to pills in four simple steps
                </h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Upload Rx</h4>
                      <p className="text-[#434655]">
                        Snap a clear photo of your prescription or upload a PDF. Our system accepts
                        digital and handwritten formats.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Extract medicines</h4>
                      <p className="text-[#434655]">
                        AI analyzes the document, extracting drug names, dosages, and quantity
                        instructions automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Add to cart</h4>
                      <p className="text-[#434655]">
                        Review the extracted items. Add matched medicines to your cart, or get
                        notified if a rare item needs sourcing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Checkout + Rx review</h4>
                      <p className="text-[#434655]">
                        A licensed pharmacist reviews your order for safety. Once approved, we ship it
                        directly to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="rounded-3xl overflow-hidden ambient-shadow border border-[rgba(195,198,215,0.2)] bg-white p-4">
                  <img
                    alt="Pharmacist Review"
                    className="w-full h-[500px] object-cover rounded-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHn40MgwsQDVGY4oXN_Hno6HjQ9v9xClzNMuqTsghkpWlStFu-m60dvja9AvNYRnzayEsg6-ulo6o-7JyVu5N2PhsU2eJBU1J3rTkeaLhz2fm6QZgmhP9Tclp3t5yOKXFtXnKw7mePkOHNHFtOBmoGEID4iEpWGeeKTQFPBPWplKKqMEAu0An7M12Slcnl_NxuwJYsCehGwr7NX_UhkiPcCGt3mJK7bK3Y4ptsyrA-paQv5SZFrCKFIeYI-WLGjWt_lOm2Cbha5NHc"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#006c49] p-6 rounded-2xl text-white ambient-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined">bolt</span>
                    <span className="font-bold">Lightning Fast</span>
                  </div>
                  <p className="text-sm opacity-90">Average review time: 14 mins</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety/Privacy Strip */}
        <section className="py-12 bg-[#0b1c30] text-white">
          <div className="max-w-[1280px] mx-auto px-[32px]">
            <div className="flex flex-wrap items-center justify-between gap-8 opacity-80">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4edea3]">cloud_done</span>
                <span className="text-sm">HIPAA Compliant Cloud Storage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4edea3]">encrypted</span>
                <span className="text-sm">End-to-end Data Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4edea3]">delete_sweep</span>
                <span className="text-sm">Minimal Data Retention Policy</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4edea3]">security</span>
                <span className="text-sm">No PII exposed in frontend</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#e5eeff] py-16">
        <div className="max-w-[1280px] mx-auto px-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-12">
            <div className="lg:col-span-1">
              <img
                alt="MedScan Logo"
                className="h-10 w-10 object-contain mb-6"
                src={medicalSymbol}
              />
              <p className="text-[#434655] mb-4">
                Digitizing prescriptions for a healthier, more convenient tomorrow.
              </p>
            </div>

            <div>
              <h5 className="text-[#004ac6] font-bold mb-6 text-[13px] leading-[1] tracking-[0.05em]">
                Product
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    Clinical Safety
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[#004ac6] font-bold mb-6 text-[13px] leading-[1] tracking-[0.05em]">
                Resources
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    Regulatory Affairs
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#434655] hover:text-[#006c49] transition-all text-[13px] leading-[1] tracking-[0.05em] font-semibold"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[#004ac6] font-bold mb-6 text-[13px] leading-[1] tracking-[0.05em]">
                Download App
              </h5>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#0b1c30] rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">phone_iphone</span>
                </div>
                <div className="w-10 h-10 bg-[#0b1c30] rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">ad_units</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[rgba(195,198,215,0.3)] text-[#434655]">
            <p className="text-[13px] leading-relaxed tracking-[0.05em] font-semibold max-w-4xl">
              © 2024 MedScan AI. Medical Disclaimer: MedScan is an information tool and not a
              substitute for professional medical advice, diagnosis, or treatment. Not medical advice.
              Always consult with a qualified healthcare provider regarding a medical condition.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
