import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faCircleLeft, faCircleRight);
import Cookies from "js-cookie";
import "./App.css";

import PersonnagesPage from "./pages/Personnages";
import ComicsPage from "./pages/Comics";
import FavorisPage from "./pages/Favoris";
import PersonnageComics from "./pages/PersonnageComics";
import ComicsDetails from "./pages/ComicsDetails";
import Navbar from "./component/Navbar";

function App() {
  //const json =  '{"perso":["5fcf91f4d8a2480017b91454","5fcf91f8d8a2480017b91459","5fcf91f6d8a2480017b91456"], "comics":["555","666"]}';

  const json = '{"perso":[], "comics":[]}';
  // Cookies.set("favoris", json, { expires: 7 });

  if (Cookies.get("favoris")) {
    console.log("On a deja un cookie ! ", Cookies.get("favoris"));
  } else {
    Cookies.set("favoris", json, {
      expires: 7,
    });
  }

  //const favoris = Cookies.get("favoris");
  //const test = JSON.parse(favoris);
  //test.perso.push("5fcf91f4d8a2480017b91454");
  //console.log("test ====>", test);
  //Cookies.set("favoris", JSON.stringify(test));

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<PersonnagesPage />} />
        <Route path="/personnage-comics/:id" element={<PersonnageComics />} />
        <Route path="/comics/:id" element={<ComicsDetails />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/favoris" element={<FavorisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
