import { Routes, Route } from "react-router-dom";
import BookablesView from "./BookablesView";
import BookableNew from "./BookableNew";
import BookableEdit from "./BookableEdit";

export default function BookablesPage() {
  return (
    <Routes>
      <Route path = '/:id' element={<BookablesView/>} />
      <Route path = '/' element={<BookablesView/>} />
      <Route path = '/:id/edit' element={<BookableEdit/>} />
      <Route path = '/new' element={<BookableNew/>} />
    </Routes>
  )
}
