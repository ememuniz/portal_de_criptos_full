import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [cryptosOptions, setCryptosOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoFrames, setCryptoFrames] = useState([]);

  useEffect(() => {
    const fetchCryptoOptions = async () => {
      try {
        const response = await fetch("http://localhost:3000/criptos/options");
        const data = await response.json();
        const options = data.map((crypto) => ({
          value: crypto.name,
          label: crypto.name,
        }));
        setCryptosOptions(options);
      } catch (error) {
        console.error("Error fetching crypto options:", error);
      }
    };
    fetchCryptoOptions();
  }, []);

  const addCryptoFrame = async () => {
    if (!selectedCrypto) return;

    try {
      // Primeiro, chama o endpoint /add para adicionar a criptomoeda ao banco
      const responseAdd = await fetch("http://localhost:3000/criptos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: selectedCrypto.value }),
      });

      if (!responseAdd.ok) {
        console.error("Error adding crypto:", responseAdd.statusText);
        return;
      }

      const addedCrypto = await responseAdd.json();        

      // Em seguida, chama o endpoint /view/:id para buscar os dados
      const response = await fetch(`http://localhost:3000/criptos/view/${addedCrypto._id}`,{
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        }
      });
      const newCrypto = await response.json();

      if (!cryptoFrames.some((frame) => frame._id === newCrypto._id)) {
        setCryptoFrames([...cryptoFrames, { ...newCrypto, activeWidgets: ["main", "24h", "30d", "markets", "exchanges"] }]);
      }

      //!--------------------------------------------------------------------------------
      console.log('Crypto added:', cryptoFrames);
      //!--------------------------------------------------------------------------------
      
      
    } catch (error) {
      console.error("Error adding crypto frame:", error);
    }
  };

  const removeCryptoFrame = async (id) => {
    try {
      await fetch(`http://localhost:3000/criptos/delete/${id}`, {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      });
      setCryptoFrames(cryptoFrames.filter((frame) => frame._id !== id));
    } catch (error) {
      console.error("Error removing crypto frame:", error);
    }
  };

  const toggleWidget = (cryptoId, widget) => {
    setCryptoFrames(
      cryptoFrames.map((frame) =>
        frame._id === cryptoId
          ? {
              ...frame,
              activeWidgets: frame.activeWidgets.includes(widget)
                ? frame.activeWidgets.filter((w) => w !== widget)
                : [...frame.activeWidgets, widget],
            }
          : frame
      )
    );
  };

  return (
    <div className="cripto-dashboard">
      <div className="cripto-seletor">
        <Select options={cryptosOptions} onChange={setSelectedCrypto} placeholder="Select Cryptocurrency" />
        <button className="cripto-add-button" onClick={addCryptoFrame} >
          Visualizar
        </button>
      </div>

      <div className="frame">
        {cryptoFrames.map((crypto) => (
          <div key={crypto._id} className="cripto-frame">
            <div className="cripto-header">
              <h2 className="cripto-title"> {crypto.name} ({crypto.symbol}) </h2>
              <button className="cripto-remove-button" onClick={() => removeCryptoFrame(crypto._id)} >
                Remover
              </button>
            </div>

            <div className="cripto-cards">
              {crypto.activeWidgets.includes("main") && (
                <div className="cripto-main">
                  <h3 className="font-bold">Informações Principais</h3>
                  <ul>
                    <li>Rank: {crypto.rank}</li>
                    <li>Preço: R${crypto.price}</li>
                    <li>Market Cap: {crypto.market_cap}</li>
                  </ul>
                </div>
              )}

              {crypto.activeWidgets.includes("24h") && (
                <div className="cripto-24h">
                  <h3 className="font-bold">Últimas 24 horas</h3>
                  <Bar
                    data={{
                      labels: ["Volume", "Low", "High", "Delta"],
                      datasets: [
                        {
                          label: "Últimas 24h",
                          data: [crypto.total_volume_24h, crypto.low_24h, crypto.high_24h, crypto.delta_24h],
                          backgroundColor: "#4f46e5",
                        },
                      ],
                    }}
                  />
                </div>
              )}

              {crypto.activeWidgets.includes("30d") && (
                <div className="cripto-30d">
                  <h3 className="font-bold">Últimos 30 dias</h3>
                  <Bar
                    data={{
                      labels: ["7 Dias", "30 Dias"],
                      datasets: [
                        {
                          label: "Delta",
                          data: [crypto.delta_7d, crypto.delta_30d],
                          backgroundColor: "#16a34a",
                        },
                      ],
                    }}
                  />
                </div>
              )}

              {crypto.activeWidgets.includes("markets") && (
                <div className="cripto-markets">
                  <h3 className="font-bold">Mercados</h3>
                  <Bar
                    data={{
                      labels: crypto.markets.map((market) => market.symbol),
                      datasets: [
                        {
                          label: "Preço",
                          data: crypto.markets.map((market) => market.price),
                          backgroundColor: "#f59e0b",
                        },
                      ],
                    }}
                  />
                </div>
              )}

              {crypto.activeWidgets.includes("exchanges") && (
                <div className="cripto-exchanges">
                  <h3 className="font-bold">Exchanges</h3>
                  {crypto.markets.map((market) => (
                    <div className="cripto-exchange">
                      <h1>{market.symbol}</h1>
                      <Bar
                        data={{
                          labels: market.exchanges.map((exchange) => exchange.name),
                          datasets: [
                            {
                              label: "Preço",
                              data: market.exchanges.map((exchange) => exchange.price),
                              backgroundColor: "#314A6C",
                            },
                          ],
                        }}
                      />
                    </div>    
                  ))}
                </div>
              )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;