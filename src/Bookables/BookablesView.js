import { useParams, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { useQuery } from "react-query";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import PageSpinner from "../UI/PageSpinner";

export default function BookablesView() {
  const {data : bookables = [], status, error} = useQuery(
    "bookables",
    () => fetch("http://localhost:3001/bookables")
    .then(res => res.json())
  );

  const {id} = useParams();
  // console.log('id', id);
  // console.log('parseInt(id, 10)', parseInt(id, 10));
  const bookable = bookables.find(b => b.id == id) || bookables[0];

  if(status === "error"){
    return <p>{error.message}</p>
  }

  if(status === "loading"){
    return <PageSpinner />
  }

  return (
    <main className="bookables-page">
        <div>
        <BookablesList 
          bookable={bookable} 
          bookables={bookables}
          getUrl = {id => `/bookables/${id}`}
        />

        <p className="controls">
          <Link
            to='/bookables/new'
            replace={true}
            className='btn'
          >
            <FaPlus/>
            <span>New</span>
          </Link>
        </p>
        </div>

        <BookableDetails bookable={bookable} />
    </main>
  )
}
