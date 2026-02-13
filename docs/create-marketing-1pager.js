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
const noBorders = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: DONYATI_DARK_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: DONYATI_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: DONYATI_DARK_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 160, after: 60 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] },
      { reference: "numbered-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    children: [
      // Header banner
      new Table({
        columnWidths: [10080],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                shading: { fill: DONYATI_PURPLE, type: ShadingType.CLEAR },
                width: { size: 10080, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "DONYATI", bold: true, color: "FFFFFF", size: 36 })]
                  })
                ]
              })
            ]
          })
        ]
      }),

      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, spacing: { before: 240 }, children: [new TextRun("AI Maturity Assessment")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Free Self-Service Tool for Organizations", size: 24, italics: true, color: "666666" })]
      }),

      // What It Is
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What Is It?")] }),
      new Paragraph({ spacing: { after: 120 }, children: [
        new TextRun("A free, self-service assessment that helps organizations understand their AI readiness in under 5 minutes. Users receive instant results with personalized recommendations and the option to schedule a consultation with Donyati experts.")
      ]}),

      // Two-column layout for features
      new Table({
        columnWidths: [4900, 4900],
        rows: [
          new TableRow({
            children: [
              // Left column - How It Works
              new TableCell({
                borders: noBorders,
                width: { size: 4900, type: WidthType.DXA },
                children: [
                  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("How It Works")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Select industry")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Answer 7 quick questions")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Enter contact info")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Get instant results")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Download PDF report")] }),
                  new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Schedule consultation")] }),
                ]
              }),
              // Right column - What Users Get
              new TableCell({
                borders: noBorders,
                width: { size: 4900, type: WidthType.DXA },
                children: [
                  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What Users Get")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Overall maturity score (0-4)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Maturity level classification")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Industry benchmarking")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("7 dimension breakdown")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun("Top 3 recommendations")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Branded PDF report")] }),
                ]
              }),
            ]
          })
        ]
      }),

      // 7 Dimensions
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7 Assessment Dimensions")] }),
      new Table({
        columnWidths: [2520, 2520, 2520, 2520],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Governance & Risk", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Developer Enablement", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Workflow Integration", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Platform & Architecture", bold: true, size: 18 })] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Human Oversight", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Knowledge & Docs", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIGHT_PURPLE, type: ShadingType.CLEAR }, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "Value Measurement", bold: true, size: 18 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2520, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "", size: 18 })] })] }),
            ]
          }),
        ]
      }),

      // Maturity Levels
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5 Maturity Levels")] }),
      new Table({
        columnWidths: [2016, 2016, 2016, 2016, 2016],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: "E8E8E8", type: ShadingType.CLEAR }, width: { size: 2016, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Level 0", bold: true, size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "AI-Aware", size: 18, color: "666666" })] })
                ] }),
              new TableCell({ borders: cellBorders, shading: { fill: "D0E0F0", type: ShadingType.CLEAR }, width: { size: 2016, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Level 1", bold: true, size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "Tool Adoption", size: 18, color: "666666" })] })
                ] }),
              new TableCell({ borders: cellBorders, shading: { fill: "B8D0E8", type: ShadingType.CLEAR }, width: { size: 2016, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Level 2", bold: true, size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "Workflow Integration", size: 18, color: "666666" })] })
                ] }),
              new TableCell({ borders: cellBorders, shading: { fill: "A0C0E0", type: ShadingType.CLEAR }, width: { size: 2016, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Level 3", bold: true, size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "Platform & Gov", size: 18, color: "666666" })] })
                ] }),
              new TableCell({ borders: cellBorders, shading: { fill: DONYATI_LIME, type: ShadingType.CLEAR }, width: { size: 2016, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Level 4", bold: true, size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "AI-Native", size: 18, color: "333333" })] })
                ] }),
            ]
          })
        ]
      }),

      // Two-column for Industries and Admin Features
      new Table({
        columnWidths: [4900, 4900],
        rows: [
          new TableRow({
            children: [
              // Left column - Industries
              new TableCell({
                borders: noBorders,
                width: { size: 4900, type: WidthType.DXA },
                children: [
                  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("12 Industries Supported")] }),
                  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Financial Services • Healthcare", size: 18 })] }),
                  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Manufacturing • Retail • Technology", size: 18 })] }),
                  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Professional Services • Energy", size: 18 })] }),
                  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Government • Education • Media", size: 18 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Transportation • General", size: 18 })] }),
                ]
              }),
              // Right column - Admin Features
              new TableCell({
                borders: noBorders,
                width: { size: 4900, type: WidthType.DXA },
                children: [
                  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Admin Dashboard")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: "Real-time analytics & charts", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: "Lead management & tracking", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: "Meeting scheduling status", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: "Marketing attribution (UTM)", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "CSV export for CRM", size: 20 })] }),
                ]
              }),
            ]
          })
        ]
      }),

      // CTA Banner
      new Paragraph({ spacing: { before: 200 }, children: [] }),
      new Table({
        columnWidths: [10080],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                shading: { fill: DONYATI_LIME, type: ShadingType.CLEAR },
                width: { size: 10080, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 160, after: 80 },
                    children: [new TextRun({ text: "Try It Now", bold: true, color: DONYATI_DARK_PURPLE, size: 28 })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 160 },
                    children: [new TextRun({ text: "https://ai-maturity-assessment-dvro.vercel.app/", color: DONYATI_PURPLE, size: 22 })]
                  })
                ]
              })
            ]
          })
        ]
      }),

      // Footer info
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 160 },
        children: [new TextRun({ text: "Powered by Next.js • Hosted on Vercel • Data stored in Neon Postgres", size: 16, color: "999999" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/c/Users/MattJanecek/Claude/AIAssessment/apps/self-service/docs/AI-Maturity-Assessment-Marketing-1Pager.docx", buffer);
  console.log("Marketing 1-pager created: AI-Maturity-Assessment-Marketing-1Pager.docx");
});
