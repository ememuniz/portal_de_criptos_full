async function getCriptos() {
  const res = await fetch(
    'http://localhost:3000/api/cripto.json',
  );
  const data = await res.json();
  console.log(data);
  return data['coins'];
}

module.exports.default = { getCriptos };
