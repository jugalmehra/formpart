import React,{useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, option } from 'reactstrap';
import { makeGetRequest } from '../http-service';

function Timingform(){

    const Timings = [{ label:'08:00 AM', value:8  },
                    { label:'09:00 AM', value:9  },
                    { label:'10:00 AM', value:10 },
                    { label:'11:00 AM', value:11 },
                    { label:'12:00 PM', value:12 },
                    { label:'01:00 PM', value:13 },
                    { label:'02:00 PM', value:14 },
                    { label:'03:00 PM', value:15 },
                    { label:'04:00 PM', value:16 },
                    { label:'05:00 PM', value:17 },
                    { label:'06:00 PM', value:18 },
                    { label:'07:00 PM', value:19 },
                    { label:'08:00 PM', value:20 },
                    { label:'09:00 PM', value:21 },
                    { label:'10:00 PM', value:22 },]

    const [doctortiming, setDoctortiming] = useState({
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
    })

    const [isdirty, setIsdirty] = useState({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        makeGetRequest(
            'http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051',
            true,
            null
        )
        .then(res => {
            console.log('doctor res: ', res.doctor.availability)
            let availability = res.doctor.availability;
            availability.forEach(el => {
                doctortiming[el.day].push({from:el.from,to:el.to})
                setDoctortiming({...doctortiming})
            })
        })
        .catch(err => {
            console.log(err)
            alert('error in fetching data')
        })

    },[])

    //for handle change
    const handleonchange = (day,index,value) => {

        let update = true;

        if(value.from === '' || value.from){
            console.log(value)
            doctortiming[day][index].from = value.from;
            setDoctortiming({...doctortiming})
            if(doctortiming[day][index].from === doctortiming[day][index].to){
                doctortiming[day][index].to = '';
                setDoctortiming({...doctortiming})
            }
        } else if(value.to === '' || value.to){
            doctortiming[day][index].to =  value.to
            setDoctortiming({...doctortiming})
        } else{
            console.log('error')
        }

        if(update){
            //isdirty[day] = true;
            setIsdirty({...isdirty,[day]:true})
            // validatetiming()
            
        }

    }

    useEffect(() => {
       validatetiming()
    },[isdirty])

    //check error by day supplied
    const checkerrors = (day) => {
        let overlap = false, fromrequired = false, torequired = false;
        for(let i=0; i < doctortiming[day].length; i++){
            let slot = doctortiming[day][i];
            let nextslot = doctortiming[day][i+1] ? doctortiming[day][i+1] : null;
            if(!slot.from || slot.from === ''){
                fromrequired = true;
                break;
            }else if(!slot.to || slot.to === ''){
                torequired = true;
                break;
            }else if(nextslot && nextslot.from && nextslot.from < slot.to){
                overlap = true;
                break;
            }else{
                continue;
            }
        }

        let error = '';

        if(fromrequired){
            error = 'from timing is required';
        }else if(torequired){
            error = 'to timing is required';
        }else if(overlap){
            error = 'timing is overlapping';
        }else{
            error = null;
        }

        return error
    }


    //validate timing part
    const validatetiming = () => {
        Object.keys(doctortiming).forEach((item) => {
            switch(item) {
                case 'Monday': {
                    if(isdirty.Monday){
                        let error = checkerrors('Monday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Tuesday': {
                    if(isdirty.Tuesday){
                        let error = checkerrors('Tuesday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Wednesday': {
                    if(isdirty.Wednesday){
                        let error = checkerrors('Wednesday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Thursday': {
                    if(isdirty.Thursday){
                        let error = checkerrors('Thursday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Friday': {
                    if(isdirty.Friday){
                        let error = checkerrors('Friday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Saturday': {
                    if(isdirty.Saturday){
                        let error = checkerrors('Saturday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }
                case 'Sunday': {
                    if(isdirty.Sunday){
                        let error = checkerrors('Sunday');
                        if(!error || error === ''){
                            console.log(error)
                            delete errors[item]
                            setErrors({...errors})
                            setIsdirty({...isdirty,[item]:false})
                        }else{
                            console.log(error)
                            setErrors({...errors,[item] : error})
                        }
                    }
                    break;
                }

            }
        })
        return errors.length ? errors : null;
    }

    //hand the form submit
    const handleformsubmit = (e) => {
        e.preventDefault();

        let isdirty = {
            Monday: true,
            Tuesday: true,
            Wednesday: true,
            Thursday: true,
            Friday: true,
            Saturday: true,
            Sunday: true
        }
        setIsdirty(isdirty)
        
        

    } 



    //for deleting timing slot
    const Deleteslot = (day, index) =>{
        doctortiming[day].splice(index,1)
        setDoctortiming({...doctortiming})
        console.log(doctortiming)
    }

    //for adding timing slots
    const Addslot = (day) => {
        console.log(day)
        
        doctortiming[day].push({from:'',to:''})
        setDoctortiming({...doctortiming})
    }


    const handleTimingpart = (day, index, value) =>{

        const fromoptions = Timings.map( (t,i) => {
            if(i===Timings.length-1) return null;
            return <option key={t.value} value={t.value}>{t.label}</option>
        })

        const tooptions = Timings.map( (t,i) => {
            if(t.value <= value.from || i===0) return null;
            return <option key={t.value} value={t.value}>{t.label}</option>
        })

        return(
            <>
                <FormGroup key={index}>
                    <Input type="select" value={value.from} onChange={(e) => handleonchange(day,index,{'from': Number(e.target.value) ? Number(e.target.value) : ''})} >
                        <option value="">Select Timings</option>

                        {fromoptions}

                    </Input>
                </FormGroup>
                <FormGroup key={index}>
                    <Input type="select" value={value.to} onChange={(e) => handleonchange(day,index,{'to': Number(e.target.value) ? Number(e.target.value) : ''})} >
                        <option value="">Select Timings</option>

                        {tooptions}

                    </Input>
                </FormGroup>
                <Button onClick={() => Deleteslot(day,index) }>Delete Slot</Button>
            </>
        );
    }

    const mondaytimings = React.Children.toArray(doctortiming.Monday.map((m, i) => {
        return handleTimingpart('Monday',i,m)
    }))

    const tuesdaytimings = React.Children.toArray(doctortiming.Tuesday.map((m, i) => {
        return handleTimingpart('Tuesday',i,m)
    }))

    const wednesdaytimings = React.Children.toArray(doctortiming.Wednesday.map((m, i) => {
        return handleTimingpart('Wednesday',i,m)
    }))

    const thursddaytimings = React.Children.toArray(doctortiming.Thursday.map((m, i) => {
        return handleTimingpart('Thursday',i,m)
    }))

    const fridaytimings = React.Children.toArray(doctortiming.Friday.map((m, i) => {
        return handleTimingpart('Friday',i,m)
    }))

    const saturdaytimings = React.Children.toArray(doctortiming.Saturday.map((m, i) => {
        return handleTimingpart('Saturday',i,m)
    }))

    const sundaytimings = React.Children.toArray(doctortiming.Sunday.map((m, i) => {
        return handleTimingpart('Sunday',i,m)
    }))

    return(
        <div>
            <FormGroup>
                <Label>Monday</Label> {' '} <Button onClick={() => Addslot('Monday') }>Add</Button><br/>
                <div>
                    {mondaytimings}

                    {errors && (<div> {errors.Monday} </div>)}
                </div>
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Tuesday</Label> {' '}  <Button onClick={() => Addslot('Tuesday') }>Add</Button><br/>
                {tuesdaytimings}

                {errors && (<div> {errors.Tuesday} </div>)}

            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Wednesday</Label> {' '}  <Button onClick={() => Addslot('Wednesday') }>Add</Button><br/>
               {wednesdaytimings}

               {errors && (<div> {errors.Wednesday} </div>)}

            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Thursday</Label> {' '}  <Button onClick={() => Addslot('Thursday') }>Add</Button><br/>
                {thursddaytimings}

                {errors && (<div> {errors.Thursday} </div>)}

            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Friday</Label> {' '}  <Button onClick={() => Addslot('Friday') }>Add</Button><br/>
                {fridaytimings}

                {errors && (<div> {errors.Friday} </div>)}

            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Saturday</Label> {' '}  <Button onClick={() => Addslot('Saturday') }>Add</Button><br/>
                {saturdaytimings}

                {errors && (<div> {errors.Saturday} </div>)}

            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Sunday</Label> {' '}  <Button onClick={() => Addslot('Sunday') }>Add</Button><br/>
                {sundaytimings}

                {errors && (<div> {errors.Sunday} </div>)}

            </FormGroup>
            <div className="buttoncontainer">
            <Button onClick={handleformsubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default Timingform;