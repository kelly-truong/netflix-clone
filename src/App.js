import React, { useState } from 'react';
import './App.scss';
import requests from './requests';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';

function App() {
  // two trailers play when in diff rows
  // how to close trailer if another trailer is opened in diff row
  // if new row is diff than current row, close the trailer in current row

  const [rowSelected, setRowSelected] = useState(null)

  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} rowSelected={rowSelected} setRowSelected={setRowSelected} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} rowSelected={rowSelected} setRowSelected={setRowSelected} />
    </div>
  );
}

export default App;
