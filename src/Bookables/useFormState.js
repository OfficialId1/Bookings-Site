import { useState, useEffect } from "react";

export default function useFormState (data) {
  const [state, setState] = useState(data);
  // const [arr, setArr] = useState([]);
  // const [name, setName] = useState('');

  console.log('state', state);
  // console.log('arr', arr);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  function handleChange (e) {
    
    setState({
      ...state,
      [e.target.name]: e.target.value,
      // id : data ? state.id : countId+1
    });
  }


  // function handleCheck(e){
  //   console.log('e.target', e.target.checked);
  //   if(e.target.checked){
  //     setArr([...arr, parseInt(e.target.value)]);
  //   console.log('arr in handleCheck', arr);
  //   setName(e.target.name);
  //   }
  //   else{
  //     setArr(arr.filter(a => a != e.target.value));
  //   }
  // }

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     [name] : arr
  //   })
  // }, [arr])

  function handleChecked (e) {
    const {name, value, checked} = e.target;
    
    const values = new Set(state[name]);
    const intValue = parseInt(value, 10);

    values.delete(intValue);
    if (checked) values.add(intValue);

    setState({
      ...state,
      [name]: [...values]
    });
  }

  console.log('state', state);

  return {
    state,
    handleChange,
    handleChecked
  };
}