import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import PopupCriptoExist from "../design/elements/popupCriptoExist";

const Dashboard = () => {
  const [cryptosOptions, setCryptosOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoFrames, setCryptoFrames] = useState([]);
  const [showWidgetsPopup, setShowWidgetsPopup] = useState(false);
  const [selectedCryptoId, setSelectedCryptoId] = useState(null);
  const [widgetSelection, setWidgetSelection] = useState({});
  const [showPopupCriptoExist, setShowPopupCriptoExist] = useState(false);

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

    const ReloadPage = async() => {
      fetch('http://localhost:3000/criptos/deleteAll', {
        method: 'DELETE',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted successfully:', data);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
    }
    ReloadPage();
    fetchCryptoOptions();
  }, []);

  const addCryptoFrame = async () => {
    if (!selectedCrypto) return;

    try {
      const responseAll = await fetch("http://localhost:3000/criptos/all", {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        }
      });
      const allCryptos = await responseAll.json();
      const cryptoExists = allCryptos.find((crypto) => crypto.name === selectedCrypto.value);
      if (cryptoExists) { 
        setShowPopupCriptoExist(true);
        return;
      }
      
      
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

  const openWidgetsPopup = (cryptoId, activeWidgets) => {
    setSelectedCryptoId(cryptoId);
    setWidgetSelection(
      ["main", "24h", "30d", "markets", "exchanges"].reduce((acc, widget) => {
        acc[widget] = activeWidgets.includes(widget);
        return acc;
      },[])
    );
    setShowWidgetsPopup(true);
  };

  const toggleWidgetSelection = (widget) => {
    setWidgetSelection({...widgetSelection, [widget]: !widgetSelection[widget]});
  }

  const confirmCryptoExist = async () => {
    setCryptoFrames (cryptoFrames);
    setShowPopupCriptoExist(false);
  }

  const confirmWidgetSelection = () => {
    setCryptoFrames (
      cryptoFrames.map((frame) =>
        frame._id === selectedCryptoId
          ? {...frame,activeWidgets: Object.keys(widgetSelection).filter((widget) => widgetSelection[widget])}
          : frame
      )
    );
    setShowWidgetsPopup(false);
  }

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
            <button className="cripto-widget-button" onClick={() => openWidgetsPopup(crypto._id, crypto.activeWidgets)}>
              Gerenciar Widgets
            </button>

            <div className="cripto-cards">
              {crypto.activeWidgets.includes("main") && (
                <div className="cripto-main">
                  <button
                    className="cripto-button-close"
                    onClick={() => toggleWidget(crypto._id, "main")}
                  >
                    X
                  </button>
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
                  <button                
                    className="cripto-button-close"
                    onClick={() => toggleWidget(crypto._id, "24h")}
                  >
                    X
                  </button>
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
                  <button
                    className="cripto-button-close"
                    onClick={() => toggleWidget(crypto._id, "30d")}
                  >
                    X
                  </button>
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
                  <button
                    className="cripto-button-close"
                    onClick={() => toggleWidget(crypto._id, "markets")}
                  >
                    X
                  </button>
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
                  <button
                    className="cripto-button-close"
                    onClick={() => toggleWidget(crypto._id, "exchanges")}
                  >
                    X
                  </button>
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
      {showWidgetsPopup && (
        <div className = "widgets-popup-overlay">
          <div className="widgets-popup-content">
            <h1>Selecionar os Widgets</h1>
            {Object.keys(widgetSelection).map((widget) => (
              <div key={widget} className="widgets-popup-option">
                <input
                  type="checkbox"
                  checked={widgetSelection[widget]}
                  onChange={() => toggleWidgetSelection(widget)}
                />
                <label>{widget}</label>
              </div>
            ))}
            <button className="widgets-confirm-button" onClick={confirmWidgetSelection}>OK</button>
          </div>
        </div>
      )}
      {showPopupCriptoExist && (
        <div className="widgets-popup-overlay">
          <div className="widgets-popup-content">
            <h1>Alerta!</h1>
            <p>{`A criptomoeda ${selectedCrypto.value} ja foi adicionada.`}</p>
            <button className="widgets-confirm-button" onClick={confirmCryptoExist}>OK</button>
          </div>  
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;