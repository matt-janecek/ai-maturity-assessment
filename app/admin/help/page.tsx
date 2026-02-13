export default function AdminHelpPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-donyati-black mb-8">Help & Documentation</h1>

      {/* Getting Started */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Getting Started</h2>
        <p className="text-gray-600 mb-3">
          The Donyati AI Maturity Assessment admin dashboard lets you manage assessment submissions,
          configure assessment settings, and review analytics. Use the sidebar to navigate between sections.
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Links</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Dashboard</strong> &mdash; Overview of submission volume and score distribution</li>
            <li><strong>Submissions</strong> &mdash; View, filter, export, and manage individual submissions</li>
            <li><strong>Settings</strong> &mdash; Configure assessment flow and active industries</li>
          </ul>
        </div>
      </section>

      {/* Dashboard */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Dashboard</h2>
        <p className="text-gray-600 mb-3">
          The dashboard provides a high-level overview of your assessment data including total submissions,
          average maturity score, score distribution charts, and recent activity.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Total Submissions</strong> &mdash; Count of all completed assessments (excluding seeded test data).</li>
          <li><strong>Average Score</strong> &mdash; Mean maturity score across all real submissions.</li>
          <li><strong>Score Distribution</strong> &mdash; Breakdown of submissions by maturity level.</li>
          <li><strong>Recent Submissions</strong> &mdash; Latest assessments with name, company, score, and timestamp.</li>
        </ul>
      </section>

      {/* Submissions Management */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Submissions Management</h2>
        <p className="text-gray-600 mb-3">
          The submissions page gives you full control over assessment data with filtering, export, and bulk actions.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Viewing & Filtering</p>
            <p className="text-sm text-gray-600">
              Use the search bar to find submissions by name, email, or company. Filter by industry
              using the dropdown. Click any row to expand and view the full assessment details.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Exporting Data</p>
            <p className="text-sm text-gray-600">
              Click the <strong>Export CSV</strong> button to download all submissions (respecting active filters)
              as a CSV file. The export includes all lead capture fields, scores, and metadata.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Deleting Submissions</p>
            <p className="text-sm text-gray-600">
              Select submissions using the checkboxes on the left, then click <strong>Delete Selected</strong>.
              A confirmation dialog will appear before any data is permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>
      </section>

      {/* Seeded Test Data */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Seeded Test Data</h2>
        <p className="text-gray-600 mb-3">
          Seeded submissions are pre-generated test entries used for demos and development. They are
          visually distinguished from real submissions with a <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Seeded</span> badge.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Seed Data</strong> &mdash; Use the &quot;Seed Data&quot; button on the submissions page to generate realistic test submissions across all industries and maturity levels.</li>
          <li><strong>Delete Seeded</strong> &mdash; Use the &quot;Delete All Seeded&quot; button to remove all seeded entries at once without affecting real submissions.</li>
          <li><strong>Identification</strong> &mdash; Seeded submissions are tagged in the database and always display the amber &quot;Seeded&quot; badge in the admin UI.</li>
        </ul>
      </section>

      {/* Settings */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Settings</h2>
        <p className="text-gray-600 mb-3">
          Configure how the public-facing assessment behaves.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Industry Selection Step</strong> &mdash; Toggle whether assessors see the industry selection step. When disabled, all assessors receive the general assessment.</li>
          <li><strong>Active Industries</strong> &mdash; Enable or disable specific industries. Disabled industries are hidden from the public assessment. &quot;General / Other&quot; is always available.</li>
        </ul>
      </section>

      {/* Authentication */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Authentication</h2>
        <p className="text-gray-600 mb-3">
          Admin access is protected by Azure AD Single Sign-On (SSO). Only authorized users in the
          Donyati Azure AD tenant can sign in to the admin dashboard.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Sign In</strong> &mdash; Navigate to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/admin/login</code> and click &quot;Sign in with Microsoft&quot;.</li>
          <li><strong>Sign Out</strong> &mdash; Use the &quot;Sign Out&quot; button at the bottom of the sidebar.</li>
          <li><strong>Session</strong> &mdash; Sessions are managed by NextAuth.js. If your session expires, you will be redirected to the login page automatically.</li>
        </ul>
      </section>

      {/* Support */}
      <section className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-3">Support</h2>
        <p className="text-gray-600">
          For technical issues, feature requests, or questions about the assessment platform,
          contact the Donyati development team.
        </p>
      </section>
    </div>
  )
}
