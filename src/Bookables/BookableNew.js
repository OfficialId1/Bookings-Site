import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import useFormState from "./useFormState";
import { createItem } from "../utils/api";

import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";
// import { useState } from "react";

export default function BookableNew () {
  // let [countId, setCountId] = useState(1000);

  // console.log('countId', countId);

  const {data : bookables = []} = useQuery(
    'bookables',
    () => fetch('http://localhost:3001/bookables').
    then(res => res.json())
  );

  // const idArray = [...new Set(bookables.map(b => b.id))];
  // console.log('idArray', idArray);
  // const maxId = Math.max(...idArray);
  // console.log('maxId', maxId);
  
  // const formState = useFormState(0, maxId);
  const formState = useFormState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate : createBookable, status, error} = useMutation(
    item => createItem('http://localhost:3001/bookables', item),
    {
      onSuccess: bookable => {
        queryClient.setQueryData(
          "bookables",
          old => [...(old || []), bookable]
        );

        navigate(`/bookables/${bookable.id}`);
      }
    }
  )

  function handleSubmit(){
    // setCountId(countId++);
    createBookable(formState.state);
  }

  if(status === 'error'){
    return <p>{error.message}</p>
  }

  if(status === 'loading'){
    return <PageSpinner />
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      // countId={countId}
      // maxId = {maxId}
    />
  );
}