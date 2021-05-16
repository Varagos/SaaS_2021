import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // we cant make this anonymous function async, we could add an external async function

    const abortCont = new AbortController();

    /* it runs on every render, e.g. start and state changes
    we could do things called side effects in React such as
      fetch data or communicate with an authentication service */
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();

    // second argument is the dependencies
  }, [url]);

  return { data, setData, isPending, error };
};

export default useFetch;
