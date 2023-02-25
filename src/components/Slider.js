import { memo, useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import { MdArrowBackIos } from "react-icons/md"



export default memo(function () {

    const [current, setCurrent] = useState(0)

  return (
        <div className="cont">
            <MdArrowBackIos id="back" onClick={() => {
                current < 100 ? setCurrent(400) : setCurrent(current - 25)
            }}/>
             <MdArrowForwardIos onClick={() => {
                current > 300 ? setCurrent(0) : setCurrent(current + 25)
            }} />
            <div className="slide" style={{left : `-${current}%`}}>
                <div className="piclist">
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                </div>
                <div className="piclist">
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                </div>
                <div className="piclist">
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                </div>
                <div className="piclist">
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                </div>
                <div className="piclist">
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                    <div className="pic"></div>
                </div>
            </div >
        </div>
  )
})
