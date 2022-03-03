import { useRef } from "react";
import useFetch from "../hooks/useFetch";
import style from '../css/createWord.module.css'

function CreateWord() {
    const days = useFetch('http://localhost:3001/days');

    function onSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3001/words/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day : dayRef.current.value,
                cn : cnRef.current.value,
                pinyin : pinyinRef.current.value,
                kor : korRef.current.value,
                isDone : false
            }),
        })
        .then(res => {
            if(res.ok) {
                alert('생성이 완료되었습니다');
            }
        });
    }

    const cnRef = useRef(null);
    const pinyinRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return(
        <form className={`${style.main}`} onSubmit={onSubmit}>
            <div className={`${style.wrap}`}>
                <label className={`${style.label}`}>한자</label>
                <input type="text" placeholder="computer" ref={cnRef}/>
            </div>
            <div className={`${style.wrap}`}>
                <label className={`${style.label}`}>병음</label>
                <input type="text" placeholder="computer" ref={pinyinRef}/>
            </div>
            <div className={`${style.wrap}`}>
                <label className={`${style.label}`}>한국어</label>
                <input type="text" placeholder="computer" ref={korRef}/>
            </div>
            <div className={`${style.wrap}`}>
                <label className={`${style.label}`}>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))} 
                </select>
            </div>
            <button className={`${style.btn}`}>저장</button>
        </form>
    )
}

export default CreateWord;