const PDFDocument = require("pdfkit");

const generatePDF = (title, content, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${title.replace(/\s+/g, "_")}.pdf`
  );

  doc.pipe(res);

  // Title
  doc
    .fontSize(18)
    .text(title, { align: "center" })
    .moveDown(2);

  // Content
  doc.fontSize(12).text(content, {
    align: "left",
    lineGap: 6,
  });

  doc.end();
};

module.exports = generatePDF;
