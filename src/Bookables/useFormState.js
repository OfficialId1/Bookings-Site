import { useState, useEffect } from "react";

export default function useFormState (data) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  function handleChange (e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

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

  return {
    state,
    handleChange,
    handleChecked
  };






  //Alternate Testing codes
  
  // const [arr, setArr] = useState([]);
  // const [name, setName] = useState('');

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
}

  