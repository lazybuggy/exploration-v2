import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

export const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = async (event) => {
    var message;

    if (event) {
      event.preventDefault();
      if (inputs.password1 === inputs.password2) {
        await fetch("http://localhost:3000/api/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            username: inputs.username,
            password: inputs.password1,
          })
        }).then(async (res) => {
          message = await res.json();
        });

      } else {
        message = "Please confirm that both passwords match."
      }
    }
    callback(message);
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }
  return { handleSubmit, handleInputChange, inputs };
};

export const useLogin = (callback) => {
  const [inputs, setInputs] = useState({});

  const handleLogin = async (event) => {
    var message;

    if (event) {
      event.preventDefault();

      await fetch("http://localhost:3000/api/users/" + inputs.username, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: inputs.password,
        })
      }).then(async (res) => {
        message = await res.json();
      });

    }
    callback(message);
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }
  return { handleLogin, handleInputChange, inputs };
};

// export const useToken = (key) => {
//   // const [token, setToken] = useState(()=>{
//   //   try{
//   //     const token = window.localStorage.getItem('token');
//   //     if (token) {
//   //       console.log('teehehee token found', token);
//   //       return token;
//   //     }
//   //   }catch(error){
//   //     console.log(error);
//   //     return null;
//   //   }
//   console.log('token hook running');
//   const [value, setValue] = useState(() => {
//     const stickyValue = window.localStorage.getItem(key);
//     return stickyValue !== null
//       ? JSON.parse(stickyValue)
//       : null;
//   });
//   React.useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);
//   return [value, setValue];
// };
  // const token = localStorage.getItem('token');
  // if (token) {
  //   console.log('teehehee token found', token);
  //   return token;
  // }
  // return null;
  // const handleLogin = async (event) => {
  //   var message;

  //   if (event) {
  //     event.preventDefault();

  //     await fetch("http://localhost:3000/api/users/" + inputs.username, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         password: inputs.password,
  //       })
  //     }).then(async (res) => {
  //       message = await res.json();
  //     });

  //   }
  //   callback(message);
  // }

  // const handleInputChange = (event) => {
  //   event.persist();
  //   setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  // }
  // return { handleLogin, handleInputChange, inputs };
// };
