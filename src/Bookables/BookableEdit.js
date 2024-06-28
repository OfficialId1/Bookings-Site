import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import useFormState from "./useFormState";
import { editItem, deleteItem } from "../utils/api";

import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";

export default function BookableEdit () {
  const {id} = useParams();
  const queryClient = useQueryClient();

  const {data : bookable = {}, isLoading}= useQuery(  
    ['bookable','id'],
    () => fetch(`http://localhost:3001/bookables/${id}`).
    then(res => res.json()),
    {
      refetchOnWindowFocus: false,

      initialData: queryClient
        .getQueryData("bookables")
        ?.find(b => b.id == parseInt(id, 10))
    }
  );

  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const formState = useFormState(bookable);

  const {mutate : updateBookable} = useMutation(
    item => editItem(`http://localhost:3001/bookables/${item.id}`, item),
    {
      onSuccess: bookable => {
        updateBookablesCache(bookable, queryClient);

        QueryClient.setQueryData(["bookable", String(bookable.id)], bookable);

        navigate(`/bookables/${bookable.id}`);
      }
    }
  );
 
  function updateBookablesCache (bookable, queryClient) {
    const bookables = queryClient.getQueryData("bookables") || [];
  
    const bookableIndex = bookables.findIndex(b => b.id == bookable.id);
  
    if (bookableIndex !== -1) {
      bookables[bookableIndex] = bookable;
      queryClient.setQueryData("bookables", bookables);
    }
  }

  const queryClientDel = useQueryClient();

  const {mutate : deleteBookable} = useMutation(
    item => deleteItem(`http://localhost:3001/bookables/${item.id}`),
    {
      onSuccess: (response, bookable) => {
        const bookables = queryClientDel.getQueryData("bookables") || [];

        queryClientDel.setQueryData(
          "bookables",
          bookables.filter(b => b.id != bookable.id)
        );

        navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
      }
    }
  );

  function getIdForFirstInGroup (bookables, excludedBookable) {
    const {id, group} = excludedBookable;
  
    const bookableInGroup = bookables.find(b => b.group == group && b.id != id);
  
    return bookableInGroup?.id;
  }

  function handleSubmit(){
    updateBookable(formState.state);
  }

  function handleDelete(){
    deleteBookable(formState.state);
  }

  if(isLoading) return <PageSpinner />
  
  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}