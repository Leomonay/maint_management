import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchWODevice } from '../../../actions/deviceActions'
import { selectTask } from '../../../actions/planActions'
import './index.css'

export default function TaskList(props){
    const {pendant, current, next} = props

    function TaskItem(props){
        const {className, task} = props
        const dispatch = useDispatch()

        let zero = [139,0,0]
        let half = [255, 255, 0]
        let full = [0,128,0]
        let color = []
        for ( let i=0; i<=2 ; i++ ){
            const completed = task.completed
            let percent = completed>=50? completed-50 : completed
            console.log(percent)
            let start = completed>=50? [...half] : [...zero]
            let end = completed>=50? [...full] : [...half]

            color[i]= Math.floor(start[i]+(end[i]-start[i])/50*percent)
        }
        let bgColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        if (className==='next') bgColor='navy'

        function handleNewOrder(){
            dispatch(searchWODevice(task.code))
            dispatch(selectTask(task))
        }
    
        return(
            <div className='taskCard' style={{border: `2px solid ${bgColor}`}}>
                <div className='taskCardTitle' style={{backgroundColor: bgColor}}>
                    <b>{`[${task.code}] ${task.device}`}</b>
                    <div className='taskCardSubTitle'>{`${task.area} > ${task.line}`} </div>
                </div>
                <div className='taskContent'>
                    <div className='taskDescription'>{task.observations}</div>
                    <div className='taskCompletion' style={{background: bgColor}}>
                        <b>{task.completed} %</b>
                    </div>
                    <Link className='taskOTButton' to='/ots/new' onClick={()=>handleNewOrder()}>Crear OT</Link>
                </div>
            </div>
        )
    }

    return(
        <div className='panelTaskList'>
            <div className='title'>Tareas por realizar</div>            
            
            {pendant[0]&&
                <div>
                    <b>Pendientes hasta la semana anterior</b>
                    <div className='taskList'>
                        {pendant.map((task,index)=><TaskItem key={index} task={task} className='pendant'/>)}
                    </div>
                </div>}

            {current[0]&&
                <div>
                    <b>Pendientes de esta semana</b>
                    <div className='taskList'>
                        {current.map((task,index)=><TaskItem key={index} task={task} className={task.completed<75?
                            'pendant'
                            :task.completed===100?'completed'
                            :'incourse'}/>)}
                    </div>
                </div>}
            {(!current[0] && !pendant[0]) &&
                <div>¡Excelente! ¡No hay trabajos pendientes!</div>
            }
            {current[0]&&
                <div>
                    <b>Tareas de la próxima semana</b>
                    <div className='taskList'>
                        {next.map((task,index)=><TaskItem key={index} task={task} className='next'/>)}
                    </div>
                </div>}
        </div>
    )
}