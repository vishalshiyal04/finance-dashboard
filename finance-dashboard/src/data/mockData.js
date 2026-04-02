import { v4 as uuidv4 } from "uuid";

const categories = {
  income: ["Salary", "Freelance", "Investments", "Rent Income"],
  expense: [
    "Groceries",
    "Entertainment",
    "Rent",
    "Utilities",
    "Dining Out",
    "Transport",
  ],
};

const getRandomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString().split("T")[0];
};

export const generateTransactions = (count = 50) => {
  const transactions = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.6 ? "income" : "expense";
    const categoryList = categories[type];
    const category =
      categoryList[Math.floor(Math.random() * categoryList.length)];

    let amount = 0;
    if (category === "Salary") amount = 4000 + Math.random() * 3000;
    else if (category === "Rent") amount = 1200 + Math.random() * 400;
    else if (category === "Freelance") amount = 200 + Math.random() * 1500;
    else amount = 10 + Math.random() * 250;

    transactions.push({
      id: uuidv4(),
      date: getRandomDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1),
        currentDate,
      ),
      description: `${category} Payment ${i + 1}`,
      category,
      type,
      amount: parseFloat(amount.toFixed(2)),
    });
  }
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
