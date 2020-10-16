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
                </div>
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Tuesday</Label> {' '}  <Button onClick={() => Addslot('Tuesday') }>Add</Button><br/>
                {tuesdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Wednesday</Label> {' '}  <Button onClick={() => Addslot('Wednesday') }>Add</Button><br/>
               {wednesdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Thursday</Label> {' '}  <Button onClick={() => Addslot('Thursday') }>Add</Button><br/>
                {thursddaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Friday</Label> {' '}  <Button onClick={() => Addslot('Friday') }>Add</Button><br/>
                {fridaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Saturday</Label> {' '}  <Button onClick={() => Addslot('Saturday') }>Add</Button><br/>
                {saturdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Sunday</Label> {' '}  <Button onClick={() => Addslot('Sunday') }>Add</Button><br/>
                {sundaytimings}
            </FormGroup>
        </div>
    );
}

export default Timingform;