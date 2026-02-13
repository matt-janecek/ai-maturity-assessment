const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber } = require('docx');
const fs = require('fs');

// Donyati brand colors
const DONYATI_PURPLE = "45266C";
const DONYATI_DARK_PURPLE = "12002A";
const DONYATI_LIME = "ACC953";
const DONYATI_LIGHT_PURPLE = "F5F3FA";

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: DONYATI_DARK_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 0, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: DONYATI_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: DONYATI_DARK_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-dimensions",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "maturity-levels",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Donyati", bold: true, color: DONYATI_PURPLE, size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Page ", size: 18, color: "666666" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
          new TextRun({ text: " of ", size: 18, color: "666666" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "666666" })
        ]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("AI Maturity Assessment")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 },
        children: [new TextRun({ text: "Features & Functionality Documentation", size: 28, color: "666666" })]
      }),

      // Overview
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Overview")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A self-service AI maturity assessment tool that allows organizations to evaluate their AI readiness across 7 dimensions, receive personalized results, and connect with Donyati consultants.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Live URL: ", bold: true }),
        new TextRun({ text: "https://ai-maturity-assessment-dvro.vercel.app/", color: DONYATI_PURPLE })
      ]}),

      // Public Assessment Features
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Public Assessment Features")] }),

      // Industry Selection
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Industry Selection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("12 industry options with tailored question wording")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Industry-specific benchmarks and percentile rankings")] }),
      new Paragraph({ spacing: { after: 120 }, children: [
        new TextRun({ text: "Industries: ", bold: true }),
        new TextRun("Financial Services, Healthcare, Manufacturing, Retail, Technology, Professional Services, Energy & Utilities, Government, Education, Media & Entertainment, Transportation & Logistics, General")
      ]}),

      // Assessment Questions
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Assessment Questions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "7 Core Questions ", bold: true }), new TextRun("covering all dimensions")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "7 Optional Deep-Dive Questions ", bold: true }), new TextRun("for more detailed analysis")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("5-point Likert scale responses (0-4)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Auto-advance after selection with visual feedback")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Progress bar showing completion status")] }),

      // 7 Dimensions
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7 Assessment Dimensions")] }),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Governance & Risk", bold: true }), new TextRun(" - AI policies, oversight, compliance")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Developer Enablement", bold: true }), new TextRun(" - Tools, training, prompt engineering")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Workflow Integration", bold: true }), new TextRun(" - AI in business processes")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Platform & Architecture", bold: true }), new TextRun(" - Infrastructure, scalability")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Human Oversight", bold: true }), new TextRun(" - Review processes, accountability")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Knowledge & Documentation", bold: true }), new TextRun(" - Best practices, knowledge sharing")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-dimensions", level: 0 }, children: [
        new TextRun({ text: "Value Measurement", bold: true }), new TextRun(" - ROI tracking, metrics")
      ]}),

      // Lead Capture
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Lead Capture Form")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Required fields: ", bold: true }), new TextRun("Name, Email, Company")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Optional fields: ", bold: true }), new TextRun("Title, Phone, Company Size")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Company size dropdown (1-50 to 5,001+ employees)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Email validation and privacy notice")] }),

      // Results Page
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Results Page")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Overall Score ", bold: true }), new TextRun("(0-4 scale)")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Maturity Level ", bold: true }), new TextRun("with descriptions")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Dimension Breakdown ", bold: true }), new TextRun("- Visual chart of all 7 dimensions")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Industry Benchmark ", bold: true }), new TextRun("- Percentile ranking vs industry peers")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Top 3 Recommendations ", bold: true }), new TextRun("with teasers")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "PDF Download ", bold: true }), new TextRun("- Branded report with all results")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Schedule Consultation ", bold: true }), new TextRun("- Direct link to Microsoft Bookings")
      ]}),

      // Maturity Levels Table
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Maturity Levels")] }),
      new Table({
        columnWidths: [1500, 2500, 5360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Level", bold: true })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Name", bold: true })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 5360, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Description", bold: true })] })] }),
            ]
          }),
          ...[[0, "AI-Aware", "Organization recognizes AI potential"], [1, "Tool Adoption", "Individual tools being used"], [2, "Workflow Integration", "AI integrated into processes"], [3, "Platform & Governance", "Centralized AI platform with governance"], [4, "AI-Native Strategic", "AI is core to strategy"]].map(([level, name, desc]) =>
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(String(level))] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: name, bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(desc)] })] }),
              ]
            })
          )
        ]
      }),

      // Admin Dashboard
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Admin Dashboard")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Authentication")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Microsoft Azure AD SSO (for @donyati.com accounts)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Development mode login (admin@donyati.com / admin123)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Protected routes via NextAuth.js middleware")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Analytics Dashboard")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Total Submissions - All-time count")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Average Score - Overall average")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Submissions This Month - Current month count")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Submissions Over Time - 30-day trend chart")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Industry Distribution - Pie chart by industry")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Score Distribution - Histogram")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maturity Level Distribution - Bar chart")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Submissions Management")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Sortable columns: ", bold: true }), new TextRun("Date, Name, Company, Industry, Score, Level")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Filters: ", bold: true }), new TextRun("Industry dropdown, date range, search")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pagination: 20 per page with navigation")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("CSV Export with current filters")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Submission Detail View")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Contact Information: ", bold: true }), new TextRun("Name, Email, Company, Title, Phone, Company Size")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Assessment Results: ", bold: true }), new TextRun("Score, Maturity Level, Industry Percentile")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Meeting Status: ", bold: true }), new TextRun("Booking click timestamp, Scheduled toggle, Notes")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Location & Device: ", bold: true }), new TextRun("IP, City/Region/Country, User Agent, Time to Complete")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Marketing Attribution: ", bold: true }), new TextRun("Referrer, UTM Source/Medium/Campaign/Term/Content")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Quick Actions: ", bold: true }), new TextRun("Email Lead, Book Meeting, Delete")
      ]}),

      // Tracking & Analytics
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Tracking & Analytics")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Automatic Tracking")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Field", bold: true })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })] }),
            ]
          }),
          ...[ ["IP Address", "From request headers (x-forwarded-for, x-real-ip)"],
               ["Country/City/Region", "Geolocation lookup via ip-api.com"],
               ["User Agent", "Browser and device information"],
               ["Referrer URL", "Previous page/site"],
               ["UTM Parameters", "Source, Medium, Campaign, Term, Content"],
               ["Time to Complete", "Seconds from start to submit"]
          ].map(([field, desc]) =>
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: field, bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(desc)] })] }),
              ]
            })
          )
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Behavioral Tracking")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Booking Click: ", bold: true }), new TextRun("Timestamp when user clicks \"Schedule Consultation\"")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Meeting Scheduled: ", bold: true }), new TextRun("Manual toggle by admin when meeting is confirmed")
      ]}),

      // Email Notifications
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Email Notifications")] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("Lead notification emails are sent via Resend.com when assessments are submitted:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Contact information with location")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Assessment results and scores")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Dimension breakdown table")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Marketing attribution (if UTM present)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Quick action buttons (Email Lead, Bookings Page)")] }),

      // PDF Report
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PDF Report Generation")] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("Server-side PDF generation using @react-pdf/renderer includes:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Donyati branding and date")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Company name and industry")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Overall score (large display)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maturity level with description")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Industry benchmark comparison")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Dimension scores table with progress bars")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Call-to-action for consultation")] }),

      // Technical Stack
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Technical Stack")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Frontend")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Next.js 14 (App Router)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("React 18")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Tailwind CSS")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Recharts (analytics charts)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Backend")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Next.js API Routes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("NextAuth.js (authentication)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Neon Postgres (serverless database)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("External Services")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Resend ", bold: true }), new TextRun("- Email notifications")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Microsoft Bookings ", bold: true }), new TextRun("- Consultation scheduling")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "ip-api.com ", bold: true }), new TextRun("- Geolocation lookup")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Vercel ", bold: true }), new TextRun("- Hosting with auto-deploy from GitHub")
      ]}),

      // Future Enhancements
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Future Enhancements")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Microsoft Graph API integration for automatic booking detection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Webhook notifications to external CRM")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("A/B testing for question variants")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Multi-language support")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Custom branding/white-label options")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("API for programmatic assessment submission")] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/c/Users/MattJanecek/Claude/AIAssessment/apps/self-service/docs/AI-Maturity-Assessment-Features.docx", buffer);
  console.log("Features document created: AI-Maturity-Assessment-Features.docx");
});
