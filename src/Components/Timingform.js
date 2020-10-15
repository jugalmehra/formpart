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

    const [doctortiming, setDotortiming] = useState({
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
                setDotortiming({...doctortiming})
            })
        })
        .catch(err => {
            console.log(err)
            alert('error in fetching data')
        })

    },[])


    const handleTimingpart = (day, index, value) =>{

        const fromoptions = Timings.map( (t,i) => {
            if(i===Timings.length-1) return null;
            return <option  value={t.value}>{t.label}</option>
        })

        const tooptions = Timings.map( (t,i) => {
            if(t.value <= value.from || i===0) return null;
            return <option  value={t.value}>{t.label}</option>
        })

        return(
            <>
                <FormGroup key={index}>
                    <Input type="select" value={value.from}>
                        <option value="">Select Timings</option>

                        {fromoptions}

                    </Input>
                </FormGroup>
                <FormGroup key={index}>
                    <Input type="select" value={value.to}>
                        <option value="">Select Timings</option>

                        {tooptions}

                    </Input>
                </FormGroup>
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
                <Label>Monday</Label><br/>
                <div>
                    {mondaytimings}
                </div>
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Tuesday</Label><br/>
                {tuesdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Wednesdaay</Label><br/>
               {wednesdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Thursday</Label><br/>
                {thursddaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Friday</Label><br/>
                {fridaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Saturday</Label><br/>
                {saturdaytimings}
            </FormGroup>
            <hr/>
            <FormGroup>
                <Label>Sunday</Label><br/>
                {sundaytimings}
            </FormGroup>
        </div>
    );
}

export default Timingform;