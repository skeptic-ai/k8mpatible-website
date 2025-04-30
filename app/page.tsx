export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Kubernetes Upgrade Compatibility Scanner
          </h1>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Stop wasting time reading documentation for every tool in your cluster.
            Instantly verify if your critical cluster tooling is compatible with your next Kubernetes upgrade.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="/signup">
              <button className="px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Try Free Tier
              </button>
            </a>
            <a href="#features">
              <button className="px-8 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50">
                View Features
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Supported Tools */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Currently Supported Tools</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">cert-manager</h3>
              <p className="mt-2 text-gray-600">
                Certificate management controller
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">ArgoCD</h3>
              <p className="mt-2 text-gray-600">
                Declarative GitOps CD tool
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Argo Workflows</h3>
              <p className="mt-2 text-gray-600">
                Container-native workflow engine
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Flux</h3>
              <p className="mt-2 text-gray-600">
                GitOps toolkit
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Istio</h3>
              <p className="mt-2 text-gray-600">
                Service mesh platform
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Linkerd</h3>
              <p className="mt-2 text-gray-600">
                Ultralight service mesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">1</span>
                <div>
                  <h3 className="font-semibold text-xl">Connect Your Cluster</h3>
                  <p className="mt-2 text-gray-600">Securely connect k8mpatible to your Kubernetes cluster</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">2</span>
                <div>
                  <h3 className="font-semibold text-xl">Scan Installed Tools</h3>
                  <p className="mt-2 text-gray-600">We detect versions of supported tools running in your cluster</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">3</span>
                <div>
                  <h3 className="font-semibold text-xl">Get Upgrade Requirements</h3>
                  <p className="mt-2 text-gray-600">Receive clear guidance on which tools need to be upgraded before your Kubernetes upgrade</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="max-w-5xl mx-auto">
            <stripe-pricing-table
              pricing-table-id="prctbl_1RIEOuFFhYS8QAwgZW6EdcC3"
              publishable-key="pk_live_51QiPXwFFhYS8QAwg0hw11DpUQtLaIGPI1NSH3LBsnIZautMvnhHu6rWVDQiPbVEMW4UttxemJlv9VNa2gmNwzfik00HGRtCXeZ">
            </stripe-pricing-table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Coming Soon</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Support for more tools</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Automated scans with email/Slack notifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team is here to help you get started and learn more about our beta program.
          </p>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:sales@k8mpatible.com" className="text-blue-600 hover:underline">
              sales@k8mpatible.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
