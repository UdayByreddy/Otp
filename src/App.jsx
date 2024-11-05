/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    const boxs = [1, 2, 3, 4, 5, 6];
    const maxLength = 1;

    const [limit, setLimit] = useState(0);
    const [values, setValues] = useState(Array(boxs.length).fill(''));

    const inputRefs = useRef([]);

    useEffect(() => {
        
        if (inputRefs.current[limit]) {
            inputRefs.current[limit].focus();
        }
    }, [limit]);

    function keyHandler(e) {
        if (e.key === 'ArrowLeft') {
            setLimit((prevLimit) => (prevLimit > 0 ? prevLimit - 1 : 0));
        } else if (e.key === 'ArrowRight') {
            setLimit((prevLimit) => (prevLimit < boxs.length - 1 ? prevLimit + 1 : boxs.length - 1));
        }
        else if(e.key==='Backspace'){
            setLimit((prevLimit) => (prevLimit>0 ? prevLimit - 1 : 0));

        }
    }

    function submitHandler(e, index) {
        const newValues = [...values];
        newValues[index] = e.target.value;

        setValues(newValues);

        
        if (e.target.value.length === maxLength) {
            setLimit((prevLimit) => (prevLimit < boxs.length ? prevLimit + 1 : prevLimit));


        }
        
       
    }

 

    return (
        <>
            <div>
                <h1>OTP</h1>
            </div>
            <div>
                {boxs.map((box, index) => (
                    <input
                        key={box}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => submitHandler(e, index)}
                        onKeyDown={keyHandler}
                        style={{ borderColor: limit === index ? 'black' : 'white' ,width:'80px',height:'40px',border:'5px',borderColor:'black'}}
                        type='text'
                        maxLength={maxLength}
                        value={values[index]}
                    
                    />
                ))}
            </div>
        </>
    );
}
