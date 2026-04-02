export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";

  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = [
      row.date,
      `"${row.description.replace(/"/g, '""')}"`,
      row.category,
      row.type,
      row.amount,
    ];
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

export const downloadFile = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
