import { useState } from 'react'
import './index.css'

export default function Paginate(props){
    const {length, select, size, min, step, defaultValue} = props
    const [current, setCurrent] = useState(1)
    const pages = parseInt(props.pages) //not destructured in order to use same variable name
    const delta = Math.floor(length/2)
    let indexes = []

    let first

    if(current<=delta+1){
        first = 1
    }else if(current>=pages-delta){
        first = pages-delta*2
    }else{
        first = current-delta
    }
    const last = Math.min(pages,first + 2*delta)

    for(let i=first;i<=last;i++){ 
        indexes.push(i)
    }

    function EdgeButton(page, caption, pageTo){
        return (
        <button className='pageButton'
            title={pageTo}
            onClick={(e)=>handleClick(e)}
            disabled={current===page}
            value={pageTo}>
                {caption}
        </button>)
    }

    function handleClick(e){
        e.preventDefault()
        setCurrent(parseInt(e.target.value))
        select(e.target.value)
    }

    return(
        <div className='pageFooter'>
            {/* <nav aria-label="Page navigation example">
                <ul class="pagination m-0">
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">{'<<'}</a></li>
                    <li class="page-item">
                        <a class="page-link pe-2 ps-2" href="#" aria-label="Previous">
                            <span aria-hidden="true">{'<'}</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">1</a></li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">2</a></li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link pe-2 ps-2" href="#" aria-label="Next">
                            <span aria-hidden="true">{'>'}</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link pe-2 ps-2" href="#">{'>>'}</a></li>
                </ul>
                <div className='d-flex'>
                    <select className='form-select p-0'>
                        <option>Ir a pág</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <select className='form-select p-0'>
                        <option>Items/pág</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
            </nav> */}

            <div className='paginate'>
                {EdgeButton(1,'<<', 1)}
                {indexes.map((index,key)=>
                    <button key={key} 
                        className={`pageButton ${index===current?'currentPage':'otherPage'}`}
                        disabled={index===current}
                        onClick={(e)=>handleClick(e)}
                        value={index}>
                            {index}
                    </button>
                )}
                {EdgeButton(last,'>>', pages)}
            </div>
            {size &&
                    <label>Items por Página: 
                    <input className='numberInput'
                        type='number'
                        min={min || 10}
                        step={step || 10}
                        defaultValue={defaultValue || 10}
                        onBlur={(e)=>size(e.target.value)}/></label>}
        </div>
    )
}