import { appConfig } from "../apiConfig"

export function createStrategy(object){
    return async function (dispatch){
        return fetch(`${appConfig.url}/strategies`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'NEW_PROGRAM',
                payload: json
            })
        })
    }
}

export function updateStrategy(data){
    return async function (dispatch){
        return fetch(`${appConfig.url}/strategies`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(json=>{
            if(!json.error)dispatch({
                type: 'UPDATE_PROGRAM',
                payload: json
            })
        })
    }
}

//createPlan
export function setDeviceStrategy(planDevices){
    return async function (dispatch){
        return fetch(`${appConfig.url}/tasks`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planDevices)
        })
        .then(response=>response.json())
        .then(json=>{
            const {errors, created} = json
            if(errors.length>0)alert(`Error${errors.length>1&&'es'}:` + errors.map(item=>`${item.code}: ${item.detail}`))
            if(created.device.length>0)
            dispatch({
                type: 'UPDATE_DEVICE_PLAN',
                payload: created
            })
        })
    }
}



export function getStrategies(conditions){
    return async function (dispatch){
        
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plant='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year

        return fetch(`${appConfig.url}/strategies${filter}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'ALL_PROGRAMS',
                payload: json
            })
        })
    }
}

export function getPlanDevices(conditions){

    return async function (dispatch){
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plantName='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year
        
        return fetch(`${appConfig.url}/tasks${filter}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'PLAN_DEVICES',
                payload: json
            })
        })
    }
}

export function getDates(conditions){
    return async function (dispatch){
        
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plant='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year

        return fetch(`${appConfig.url}/dates${filter}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'DATES',
                payload: json
            })
        })
    }
}

export function setDates(dates){
    return async function (dispatch){
        return fetch(`${appConfig.url}/dates`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dates)
        })
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'ADD_DATE',
                payload: json
            })
        })
    }
}

export function getPlan(conditions){
    return async function (dispatch){
        
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plant='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year

        return fetch(`${appConfig.url}/dates/plan${filter}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'GET_PLAN',
                payload: json
            })
        })
    }
}


