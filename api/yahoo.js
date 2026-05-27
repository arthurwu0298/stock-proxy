export default async function handler(req, res) {
  try {
    let symbol = req.query.symbol || "2330";

    // 自動去掉 .TW
    symbol = symbol.replace(".TW", "");

    const url = `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${symbol}&start_date=2024-01-01`;

    const response = await fetch(url);
    const data = await response.json();

    const last = data.data?.at(-1);

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      symbol,
      price: last?.close ?? null,
      date: last?.date ?? null
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
