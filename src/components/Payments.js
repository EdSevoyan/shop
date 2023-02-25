import { memo, useContext, useRef, useState } from "react"
import { AutoTabProvider } from "react-auto-tab"
import { Context } from "../Context"

export default memo(function Payments() {
    const $ = useContext(Context)
    let nameRef = useRef()
    let surnameRef = useRef()
    let numberRef = useRef()
    let dateRef = useRef()
    let cvvRef = useRef()
    let phoneRef = useRef()
    let resultRef = useRef()
    let validName = /^[A-Z]+$/
    let validNumber = /^\d{4}-\d{4}-\d{4}-\d{4}$/
    let validDate = /^\d{2}\/\d{2}/
    let validcvv = /^\d{3}$/
    let validReg = /^\+\d{3}$/
    let validTwo = /^\d{2}$/

    
    const [valid, setValid] = useState({
        name: "", surname: "", number: "", date: "", cvv: "", reg: "", cod: "", num1: "", num2: "", num3: ""
    })
    const changeValues = (field, e) => {
        setValid({...valid,[field]:e.target.value})
    }
    const validFields = () => {
        console.log($.cash);
        nameRef.current.style.opacity = valid.name.match(validName) ? 0 : 1;
        surnameRef.current.style.opacity = valid.surname.match(validName) ? 0 : 1;
        numberRef.current.style.opacity = valid.number.match(validNumber) ? 0 : 1;
        dateRef.current.style.opacity = valid.date.match(validDate) ? 0 : 1;
        cvvRef.current.style.opacity = valid.cvv.match(validcvv) ? 0 : 1;
        phoneRef.current.style.opacity = valid.reg.match(validReg) && valid.cod.match(validTwo) && valid.num1.match(validTwo) && valid.num2.match(validTwo) && valid.num3.match(validTwo) ? 0 : 1;
        if(valid.name.match(validName) && valid.surname.match(validName) && valid.number.match(validNumber) && valid.date.match(validDate) && valid.cvv.match(validcvv) && valid.name.match(validName) && valid.reg.match(validReg) && valid.cod.match(validTwo) && valid.num1.match(validTwo) && valid.num2.match(validTwo) && valid.num3.match(validTwo)) {
            if($.cash > $.total) {
                resultRef.current.style = "opacity:1; color:green"
                resultRef.current.innerText = 'Your paymant is succesful'
                setValid({
                    name: "", surname: "", number: "", date: "", cvv: "", reg: "", cod: "", num1: "", num2: "", num3: ""
                })
                $.setCarts([])
                $.setTotal(0)
                $.carts.map(cart => {
                    $.setCount(cart.isQuan = 1)
                    $.setMoney(cart.data = cart.price)
                })
            }
            else {
                resultRef.current.style = "opacity:1; color:red"
                resultRef.current.innerText = 'Not enough money'
            }
        } else {
            resultRef.current.style = "opacity:1; color:red"
            resultRef.current.innerText = 'The fields is not corect'
        }
    }
    const numberChange = (e) => {
        if (valid.number.length===3 || valid.number.length===8 || valid.number.length===13) {
            setValid({...valid,number: e.target.value.toString().concat('-')})}
            else {setValid({...valid,number:e.target.value})}
    } 

    const numberKeyChange = (e) => {
        if (e.key=="Backspace") {
            if (valid.number.length===3 || valid.number.length===8 || valid.number.length===13) {
                e.preventDefault();
                setValid({...valid,number: e.target.value.toString().slice(0,-1)})}
        }
        }

    return (
        <div className="form-container" style={{ display: $.openPay ? "flex" : "none" }} onClick={(event) => {
            if (event.target.className === "form-container") {
                $.setOpenPay(false)
            }
        }}>
            <form>
                <h2>Pay with Master/Visa Cards</h2>
                <img src="https://icon-library.com/images/visa-master-icon/visa-master-icon-9.jpg" alt="" />

               <AutoTabProvider>
               <div className="form-name">
                    <label htmlFor="">
                        <div className="invalid" ref={nameRef}>!</div>
                        <input tabbable="false" type="text" placeholder="Name" value={valid.name} onChange={(e) => {
                            changeValues('name', e)
                        }}/>
                    </label>

                    <label htmlFor="">
                        <div className="invalid" ref={surnameRef}>!</div>
                        <input tabbable="false" type="text" placeholder="Surname" value={valid.surname} onChange={(e) => {
                            changeValues('surname', e)
                        }}/>
                    </label>

                </div>

                <label >
                    <div className="invalid" ref={numberRef}>!</div>
                    <input tabbable="false" maxLength={19} type="text" placeholder="XXXX-XXXX-XXXX-XXXX" value={valid.number} onChange={(e) => {
                        numberChange(e)
                    }} onKeyDown={(e)=>{
                        numberKeyChange(e)
                    }}/>
                </label>

                <label htmlFor="">
                    <div className="invalid" ref={dateRef}>!</div>
                    <input tabbable="false" maxLength={5} type="text" placeholder="02/12" value={valid.date} onChange={(e) => {
                            changeValues('date', e)
                        }}/>
                </label>

                <label htmlFor="">
                    <div className="invalid" ref={cvvRef}>!</div>
                    <input tabbable="false" maxLength={3} type="text" placeholder="123" value={valid.cvv} onChange={(e) => {
                            changeValues('cvv', e)
                        }}/>
                </label>

                <div className="phone">
                    <label htmlFor="">
                        <div className="invalid" ref={phoneRef}>!</div>
                        <input tabbable="false" maxLength={4} type="text" placeholder="+374" value={valid.reg} onChange={(e) => {
                            changeValues('reg', e)
                        }}/>
                        <input tabbable="false" maxLength={2} type="text" placeholder="91" value={valid.cod} onChange={(e) => {
                            changeValues('cod', e)
                        }}/>
                        <input tabbable="false" maxLength={2} type="text" placeholder="xx" value={valid.num1} onChange={(e) => {
                            changeValues('num1', e)
                        }}/>
                        <input tabbable="false" maxLength={2} type="text" placeholder="xx" value={valid.num2} onChange={(e) => {
                            changeValues('num2', e)
                        }}/>
                        <input tabbable="false" maxLength={2} type="text" placeholder="xx" value={valid.num3} onChange={(e) => {
                            changeValues('num3', e)
                        }}/>
                    </label>
                </div>
               </AutoTabProvider>

                <button onClick={(e) => {
                    e.preventDefault()
                    validFields()
                }}>Pay</button>
                <p ref={resultRef}></p>
            </form>
        </div>
    )
})