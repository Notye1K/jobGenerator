
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Header from "./components/Header";
import Summary from "./components/Summary";

function App() {
  const emptyForm = {
    title: "",
    salary: "",
    bonus: [],
    activity: "",
    phases: [],
    skills: [],
    experience: "",
  };
  const test = {
    title: "Front",
    salary: "6000",
    bonus: ['saude', 'educação'],
    activity: "codar o dia inteiro e pesquisar",
    phases: ['entrevista', 'propsta'],
    skills: ['softSkill', 'hardSkill'],
    experience: "1 mês",
  };
  const [form, setForm] = useState(test);

  return (
  <BrowserRouter>
    <Header setForm={setForm} emptyForm={emptyForm}/>
    <Routes>
      <Route path="/" element={<Form form={form} setForm={setForm}/>}/>
      <Route path="/resumo" element={<Summary form={form} setForm={setForm}/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App
